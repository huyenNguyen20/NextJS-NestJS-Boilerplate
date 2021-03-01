import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { join } from "path";

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(
    AppModule
  );

  //Bootstrap Swagger API
  const config = new DocumentBuilder()
    .setTitle('Nest Boilerplate')
    .setDescription('The Nest Boilerplate API description')
    .setVersion('1.0')
    .addTag('Boilerplate')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  
  //Set up /public for serving static assets
  app.useStaticAssets(join(__dirname, '..', 'public'));

  app.enableCors();
  await app.listen(3000);
}
bootstrap();
