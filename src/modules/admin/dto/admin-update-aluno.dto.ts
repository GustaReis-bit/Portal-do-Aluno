import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsEmail, IsString } from 'class-validator';

export class AdminUpdateAlunoDto {
  @ApiPropertyOptional({ example: 'João da Silva' })
  @IsOptional()
  @IsString()
  nome?: string;

  @ApiPropertyOptional({ example: 'joao@mail.com' })
  @IsOptional()
  @IsEmail()
  email?: string;
}
