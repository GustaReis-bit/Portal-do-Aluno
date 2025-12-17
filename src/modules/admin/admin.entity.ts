import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Admin {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;  

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;
}
