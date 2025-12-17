// src/modules/aluno/aluno.service.ts
import { Injectable, NotFoundException, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Aluno } from './aluno.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AlunoService {
  constructor(@InjectRepository(Aluno) private repo: Repository<Aluno>) {}

  async updateProfile(id: string | number, dto: { nome?: string }) {
    const alunoId = Number(id);

    if (!dto.nome) {
      throw new BadRequestException('Nenhum dado para atualizar');
    }

    // Atualiza diretamente no banco
    const result = await this.repo.update(alunoId, { nome: dto.nome });

    if (result.affected === 0) {
      throw new NotFoundException('Aluno não encontrado');
    }

    // Retorna o aluno atualizado
    return this.repo.findOne({ where: { id: alunoId } });
  }

  async changePassword(id: string | number, dto: { senhaAtual: string; novaSenha: string }) {
    const aluno = await this.repo.findOne({ where: { id: Number(id) } });
    if (!aluno) throw new NotFoundException('Aluno não encontrado');

    if (!dto.senhaAtual || !dto.novaSenha) {
      throw new BadRequestException('Senha atual e nova senha são obrigatórias');
    }

    const ok = await bcrypt.compare(dto.senhaAtual, aluno.senha);
    if (!ok) throw new UnauthorizedException('Senha atual incorreta');

    const saltRounds = parseInt(process.env.SALT_ROUNDS || '10', 10);
    aluno.senha = await bcrypt.hash(dto.novaSenha, saltRounds);

    return this.repo.save(aluno);
  }

  async getDashboard(id: string | number) {
    const aluno = await this.repo.findOne({ where: { id: Number(id) } });
    if (!aluno) throw new NotFoundException('Aluno não encontrado');

    return {
      id: aluno.id,
      nome: aluno.nome,
      email: aluno.email,
      matricula: aluno.matricula,
    };
  }
}
