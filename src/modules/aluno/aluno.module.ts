import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Aluno } from './aluno.entity';
import { AlunoService } from './aluno.service';
import { AlunoController } from './aluno.controller';

// IMPORTAR O COMMONMODULE AQUI 👇
import { CommonModule } from '../../common/common.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Aluno]),
    CommonModule, // ✔️ AGORA FUNCIONA
  ],
  providers: [AlunoService],
  controllers: [AlunoController],
  exports: [AlunoService],
})
export class AlunoModule {}
