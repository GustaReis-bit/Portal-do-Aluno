import { Module } from '@nestjs/common';
import { AuthModule } from '../modules/auth/auth.module';
import { JwtAuthGuard } from './jwt-auth.guard';

@Module({
  imports: [AuthModule],
  providers: [JwtAuthGuard],
  exports: [JwtAuthGuard],
})
export class CommonModule {}
