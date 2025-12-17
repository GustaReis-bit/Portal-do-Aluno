import {Body,Controller,Get,Param,Patch,Post,UseGuards,Delete,} from '@nestjs/common';
import {ApiBearerAuth,ApiOperation, ApiResponse,ApiTags,ApiParam,} from '@nestjs/swagger';
import { AdminService } from './admin.service';
import { AdminCreateDto } from './dto/admin-create.dto';
import { AdminLoginDto } from './dto/admin-login.dto';
import { AdminUpdateAlunoDto } from './dto/admin-update-aluno.dto';
import { JwtAuthGuard } from '../../common/jwt-auth.guard';

@ApiTags('Admin')
@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) { }

  @Post('register')
  @ApiOperation({ summary: 'Registrar administrador' })
  register(@Body() dto: AdminCreateDto) {
    return this.adminService.register(dto);
  }

  @Post('login')
  @ApiOperation({ summary: 'Login administrador' })
  login(@Body() dto: AdminLoginDto) {
    return this.adminService.login(dto);
  }

  @Get('alunos')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Listar todos os alunos' })
  findAll() {
    return this.adminService.findAllAlunos();
  }

  @Patch('alunos/:id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Atualizar aluno' })
  @ApiParam({ name: 'id', example: 1 })
  updateAluno(
    @Param('id') id: string,
    @Body() dto: AdminUpdateAlunoDto,
  ) {
    return this.adminService.updateAluno(Number(id), dto);
  }
  @Delete('alunos/:id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Deletar aluno pelo ID' })
  @ApiParam({ name: 'id', example: 1 })
  @ApiResponse({ status: 200, description: 'Aluno deletado com sucesso' })
  @ApiResponse({ status: 404, description: 'Aluno não encontrado' })
  deleteAluno(@Param('id') id: string) {
    return this.adminService.deleteAluno(Number(id));
  }

}
