import { Controller, Get, Patch, Body, UseGuards, Req } from '@nestjs/common';
import { ApiBearerAuth, ApiTags, ApiOperation } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../common/jwt-auth.guard';
import { UpdateAlunoDto } from './dto/update-aluno.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import { AlunoService } from './aluno.service';

@ApiTags('Aluno')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('aluno')
export class AlunoController {
  constructor(private readonly alunoService: AlunoService) {}

  @Get('dashboard')
  @ApiOperation({ summary: 'Retorna dados do aluno logado' })
  dashboard(@Req() req) {
    console.log('📌 req.user recebido:', req.user);
    return this.alunoService.getDashboard(req.user.id);
  }

  @Patch()
  @ApiOperation({ summary: 'Atualizar nome do aluno' })
  update(@Req() req, @Body() dto: UpdateAlunoDto) {
    return this.alunoService.updateProfile(req.user.id, dto);
  }

  @Patch('change-password')
  @ApiOperation({ summary: 'Alterar senha (requer senha atual)' })
  changePassword(@Req() req, @Body() dto: ChangePasswordDto) {
    return this.alunoService.changePassword(req.user.id, dto);
  }
}
