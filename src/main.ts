import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
    .setTitle('Games Xbox Live')
    .setDescription('Lista de Jogos com dados persistentesa no Postgres, baseada no Xbox Live')
    .setVersion('1.0.0')
    .addTag('Status')
    .addTag("Jogos")
    .addTag("User")
    .addTag("Profiles")
    .addTag("Homepage")
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3333);
}
bootstrap();