import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class RegisterAlunoDto {
  @ApiProperty({ example: "João da Silva" })
  @IsString()
  @IsNotEmpty()
  nome: string;

  @ApiProperty({ example: "joao@mail.com" })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: "senha123" })
  @IsString()
  @IsNotEmpty()
  senha: string;

  @ApiProperty({ example: "202400123" })
  @IsString()
  @IsNotEmpty()
  matricula: string;
}
