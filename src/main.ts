import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);


  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  const config = new DocumentBuilder()
    .setTitle('Portal do Aluno')
    .setDescription('API oficial do Portal do Aluno - Autenticação, Administração e Área do Aluno')
    .setVersion('1.0')
    .addBearerAuth()
    .build();


  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document, { swaggerOptions: { persistAuthorization: true } });

  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT') || 3000;

  await app.listen(port);
  console.log(`Server running on http://localhost:${port}`);
  console.log(`Swagger docs available on http://localhost:${port}/docs`);
}

bootstrap();
