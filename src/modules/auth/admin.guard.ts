import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { SupabaseService } from '../../supabase/supabase.service';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(private readonly supabaseService: SupabaseService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const token = request.headers.authorization?.replace('Bearer ', '');

    if (!token) return false;

    const { data, error } = await this.supabaseService.client.auth.getUser(token);

    if (error || !data.user) return false;

    // Exemplo: verificar role "admin"
    return data.user.user_metadata?.role === 'admin';
  }
}
