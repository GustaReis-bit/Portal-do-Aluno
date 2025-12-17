import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAlunoDto {
  @ApiProperty({ example: 'Gustavo' })
  @IsString()
  @IsNotEmpty()
  nome: string;

  @ApiProperty({ example: '2023001' })
  @IsString()
  @IsNotEmpty()
  matricula: string;

  @ApiProperty({ example: 'gustavo@example.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'senha123' })
  @IsString()
  senha: string;

  @ApiProperty({ example: 1, required: false })
  cursoId?: number;
}
