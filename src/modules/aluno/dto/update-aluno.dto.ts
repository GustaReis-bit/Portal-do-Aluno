import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';

export class UpdateAlunoDto {
  @ApiProperty({ example: "Maria Oliveira", required: false })
  @IsString()
  @IsOptional()
  nome?: string;
}
