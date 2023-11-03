import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerConfig } from "@/common/config/swagger.config";
import { HttpExceptionFilter } from "@/exception/http-exception.filter";
import { WebsocketAdapter } from "@/gateway/gateway.adapter";
import { Logger, ValidationPipe } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
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
  await app.listen(configService.get("PORT"), () => {
    Logger.log(
      `Listening at http://localhost:${configService.get<number>("PORT")}`
    );
    Logger.log(
      "Swagger UI is available at http://localhost:" + configService.get<number>("PORT") + "/docs"
    );
    Logger.log(
      "Running in environment " + configService.get<string>("NODE_ENV")
    );
  });
}
bootstrap();
