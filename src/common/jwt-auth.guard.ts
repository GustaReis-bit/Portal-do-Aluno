import {Injectable,ExecutionContext,UnauthorizedException,} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Reflector } from '@nestjs/core';
import { AuthService } from '../modules/auth/auth.service';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(
    private readonly authService: AuthService,
    private readonly reflector: Reflector,
  ) {
    super();
  }

  async canActivate(context: ExecutionContext) {
    const canActivate = await super.canActivate(context);

    const request = context.switchToHttp().getRequest();
    const token = request.headers['authorization']?.split(' ')[1];

    if (token && this.authService?.isTokenBlacklisted) {
      const blacklisted = await this.authService.isTokenBlacklisted(token);
      if (blacklisted) {
        throw new UnauthorizedException('Token inválido (logout realizado)');
      }
    }

    return canActivate;
  }

  handleRequest(err, user) {
    if (err || !user) {
      throw err || new UnauthorizedException('Não autorizado');
    }
    return user;
  }
}
