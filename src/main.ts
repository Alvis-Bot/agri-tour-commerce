import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerConfig } from "@/common/config/swagger.config";
import { HttpExceptionFilter } from "@/exception/http-exception.filter";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  SwaggerConfig.init(app)
  app.useGlobalFilters(new HttpExceptionFilter());
  await app.listen(3000);
}
bootstrap();
