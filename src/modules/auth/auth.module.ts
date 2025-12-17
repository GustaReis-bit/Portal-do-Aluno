import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt.strategy';
import { Aluno } from '../aluno/aluno.entity';

@Module({
  imports: [
    ConfigModule,

    PassportModule.register({ defaultStrategy: 'jwt' }), // 👈 OBRIGATÓRIO

    TypeOrmModule.forFeature([Aluno]),

    JwtModule.registerAsync({
      global: true,
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: {
          expiresIn: configService.get<string>('JWT_EXPIRES_IN') || '1d',
        },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtStrategy, // 👈 OBRIGATÓRIO
  ],
  exports: [
    AuthService,
    JwtStrategy, // 👈 NECESSÁRIO PARA OS OUTROS MÓDULOS
    PassportModule,
    JwtModule,
  ],
})
export class AuthModule {}
