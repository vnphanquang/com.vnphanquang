// eslint-disable-next-line import/order
import 'module-alias/register';

import { NestFactory } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';

import { Config } from '$config/index';
import { PrismaService } from '$services/prisma/prisma.service';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({
      logger: true,
    }),
  );
  const prisma = app.get(PrismaService);
  await prisma.enableShutdownHooks(app);

  const config = app.get(Config);
  try {
    await app.listen(config.port, config.host);
  } finally {
    await prisma.$disconnect();
  }
}

bootstrap();
