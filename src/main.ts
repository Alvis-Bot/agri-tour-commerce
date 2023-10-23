import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerConfig } from "@/common/config/swagger.config";
import { HttpExceptionFilter } from "@/exception/http-exception.filter";
import { WebsocketAdapter } from "@/gateway/gateway.adapter";
import { ValidationPipe } from "@nestjs/common";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  SwaggerConfig.init(app)
  app.useGlobalPipes(
    new ValidationPipe({
      transformOptions: {
        enableImplicitConversion: true, // allow conversion underneath
      },
    }),
  );
  app.useGlobalFilters(new HttpExceptionFilter());
  const adapter = new WebsocketAdapter(app);
  app.useWebSocketAdapter(adapter);
  await app.listen(3000);
}
bootstrap();
