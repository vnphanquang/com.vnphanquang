// eslint-disable-next-line import/order
import 'module-alias/register';

import { NestFactory } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';

import { Config } from '$config/index';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({
      logger: true,
    }),
  );
  const config = app.get(Config);
  await app.listen(config.port, config.host);
}
bootstrap();
