import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { ApiModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(ApiModule)

  const document = SwaggerModule.createDocument(
    app,
    new DocumentBuilder()
      .setTitle(`API Documentation`)
      .setDescription('API Description')
      .build(),
  )
  SwaggerModule.setup('doc', app, document)

  await app.listen(3000)
}
bootstrap()
