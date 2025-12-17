import {Injectable,NotFoundException,UnauthorizedException,} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Admin } from './admin.entity';
import { AdminCreateDto } from './dto/admin-create.dto';
import { AdminLoginDto } from './dto/admin-login.dto';
import { AdminUpdateAlunoDto } from './dto/admin-update-aluno.dto';
import { JwtService } from '@nestjs/jwt';
import { Aluno } from '../aluno/aluno.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Admin)
    private adminRepo: Repository<Admin>,

    @InjectRepository(Aluno)
    private alunoRepo: Repository<Aluno>,

    private jwtService: JwtService,
  ) { }

  async register(data: AdminCreateDto) {
    const exists = await this.adminRepo.findOne({
      where: { email: data.email },
    });
    if (exists) throw new UnauthorizedException('Email já cadastrado');

    const hashed = await bcrypt.hash(data.password, 10);

    const admin = this.adminRepo.create({
      nome: data.nome,
      email: data.email,
      password: hashed,
    });

    return this.adminRepo.save(admin);
  }

 
  async login(data: AdminLoginDto) {
    const admin = await this.adminRepo.findOne({
      where: { email: data.email },
    });
    if (!admin) throw new UnauthorizedException('Credenciais inválidas');

    const valid = await bcrypt.compare(data.password, admin.password);
    if (!valid) throw new UnauthorizedException('Credenciais inválidas');

    const token = this.jwtService.sign({
      sub: admin.id,
      nome: admin.nome,
      role: 'admin',
    });

    return { access_token: token };
  }

 
  async findAllAlunos() {
    return this.alunoRepo.find();
  }

 
  async updateAluno(id: number, dto: AdminUpdateAlunoDto) {
    const aluno = await this.alunoRepo.findOne({ where: { id } });

    if (!aluno) throw new NotFoundException('Aluno não encontrado');

    try {
      await this.alunoRepo.update(id, dto);
    } catch (e) {
      throw new UnauthorizedException('Email já está sendo usado por outro aluno');
    }

    return this.alunoRepo.findOne({ where: { id } });
  }
  async deleteAluno(id: number) {
    const aluno = await this.alunoRepo.findOne({ where: { id } });

    if (!aluno) {
      throw new NotFoundException('Aluno não encontrado');
    }

    await this.alunoRepo.remove(aluno);

    return { message: 'Aluno deletado com sucesso', id };
  }

}

