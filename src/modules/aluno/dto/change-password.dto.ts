import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class ChangePasswordDto {
  @ApiProperty({ example: "senhaAtual123" })
  @IsString()
  @IsNotEmpty()
  senhaAtual: string;

  @ApiProperty({ example: "novaSenha123" })
  @IsString()
  @IsNotEmpty()
  novaSenha: string;
}
