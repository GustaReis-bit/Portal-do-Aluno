import { IsEmail, IsNotEmpty, MinLength, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AdminCreateDto {
  @ApiProperty({ example: 'João Silva' })
  @IsString()
  @IsNotEmpty()
  nome: string;

  @ApiProperty({ example: 'admin@gmail.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'senha123' })
  @IsNotEmpty()
  @MinLength(6)
  password: string;
}
