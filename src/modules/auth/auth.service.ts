import {
  Injectable,
  ConflictException,
  UnauthorizedException,
  InternalServerErrorException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Aluno } from '../aluno/aluno.entity';
import { RegisterAlunoDto } from './dto/register-aluno.dto';
  import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  /**
   * Blacklist simples em memória.
   * Em produção, trocar para Redis.
   */
  private readonly blacklist = new Set<string>();

  constructor(
    @InjectRepository(Aluno)
    private readonly alunoRepo: Repository<Aluno>,
    private readonly jwtService: JwtService,
  ) {}

  // ----------------------------------------------------
  //                    REGISTER
  // ----------------------------------------------------
  async registerAluno(dto: RegisterAlunoDto) {
    // Email já cadastrado?
    const existingEmail = await this.alunoRepo.findOne({
      where: { email: dto.email },
    });
    if (existingEmail) throw new ConflictException('Email já cadastrado');

    // Matrícula já cadastrada?
    const existingMatricula = await this.alunoRepo.findOne({
      where: { matricula: dto.matricula },
    });
    if (existingMatricula)
      throw new ConflictException('Matrícula já cadastrada');

    // Hash da senha
    const saltRounds = Number(process.env.SALT_ROUNDS ?? '10');
    if (isNaN(saltRounds)) {
      throw new InternalServerErrorException(
        'Valor inválido para SALT_ROUNDS. Defina no .env.',
      );
    }

    const senhaHash = await bcrypt.hash(dto.senha, saltRounds);

    const aluno = this.alunoRepo.create({
      nome: dto.nome,
      email: dto.email,
      matricula: dto.matricula,
      senha: senhaHash,
    });

    return this.alunoRepo.save(aluno);
  }

  // ----------------------------------------------------
  //                      LOGIN
  // ----------------------------------------------------
  async login(dto: LoginDto) {
    const aluno = await this.alunoRepo.findOne({
      where: { email: dto.email },
    });

    if (!aluno) throw new UnauthorizedException('Credenciais inválidas');

    const senhaOk = await bcrypt.compare(dto.senha, aluno.senha);

    if (!senhaOk) throw new UnauthorizedException('Credenciais inválidas');

    const payload = {
      sub: aluno.id,
      role: 'aluno',
      matricula: aluno.matricula,
      nome: aluno.nome,
      email: aluno.email,
    };

    const token = this.jwtService.sign(payload);

    return {
      accessToken: token,
      expiresIn: process.env.JWT_EXPIRES_IN || '1d',
      user: {
        id: aluno.id,
        nome: aluno.nome,
        email: aluno.email,
        matricula: aluno.matricula,
      },
    };
  }

  // ----------------------------------------------------
  //                      LOGOUT
  // ----------------------------------------------------
  async logout(token: string) {
    if (!token) {
      throw new UnauthorizedException('Token não enviado');
    }

    this.blacklist.add(token); // ⬅ bloqueia token

    return { message: 'Logout realizado com sucesso' };
  }

  // ----------------------------------------------------
  //       TOKEN BLACKLIST (logout / invalidação)
  // ----------------------------------------------------
  async isTokenBlacklisted(token: string): Promise<boolean> {
    return this.blacklist.has(token);
  }

  
}
