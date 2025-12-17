import { Controller, Post, Body, Req, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiBody } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { RegisterAlunoDto } from './dto/register-aluno.dto';
import { LoginDto } from './dto/login.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { JwtAuthGuard } from '../../common/jwt-auth.guard';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('register-aluno')
  @ApiOperation({ summary: 'Cadastrar um novo aluno' })
  @ApiBody({ type: RegisterAlunoDto })
  @ApiResponse({ status: 201, description: 'Aluno criado com sucesso' })
  register(@Body() dto: RegisterAlunoDto) {
    return this.authService.registerAluno(dto);
  }

  @Post('login')
  @ApiOperation({ summary: 'Realizar login (Aluno)' })
  @ApiBody({ type: LoginDto })
  @ApiResponse({ status: 200, description: 'Token JWT gerado com sucesso' })
  login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }

  @Post('logout')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  logout(@Req() req) {
    const token = req.headers.authorization?.split(' ')[1];
    return this.authService.logout(token);
  }

  
}
