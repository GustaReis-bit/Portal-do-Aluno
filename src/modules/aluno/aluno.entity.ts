// src/modules/aluno/aluno.entity.ts
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, Unique } from 'typeorm';

@Entity('alunos')
@Unique(['email'])
@Unique(['matricula'])
export class Aluno {
   @PrimaryGeneratedColumn()
  id: number;  // Agora é inteiro, auto-increment

  @Column()
  nome: string;

  @Column({ unique: true })
  email: string;

  @Column()
  senha: string; // armazenada como hash

  @Column({ unique: true })
  matricula: string;

  @CreateDateColumn()
  criadoEm: Date;
}
