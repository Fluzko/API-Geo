import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions } from '@nestjs/microservices';

import { getRMQConfig } from './utils/RMQConfig';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    getRMQConfig(),
  );

  await app.listen();
}
bootstrap();
