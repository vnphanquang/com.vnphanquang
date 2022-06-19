// eslint-disable-next-line import/order
import 'module-alias/register';

import fastifyCookie from '@fastify/cookie';
import { NestFactory } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { fastify } from 'fastify';

import { ConfigService } from '$config/index';
import { PrismaService } from '$services/prisma/prisma.service';

import { AppModule } from './app.module';

const fastifyInstance = fastify({ logger: false });
// keep compatible with express for oauth
fastifyInstance.addHook('onRequest', (request, reply, done) => {
  (reply as any).setHeader = function (key, value) {
    return this.raw.setHeader(key, value);
  };
  (reply as any).end = function () {
    this.raw.end();
  };
  (request as any).res = reply;
  done();
});

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(fastifyInstance),
  );
  const config = app.get(ConfigService).get();

  app.register(fastifyCookie, {
    secret: config.cookies.secret,
  });

  const prisma = app.get(PrismaService);
  await prisma.enableShutdownHooks(app);

  try {
    await app.listen(config.port, config.host);
  } finally {
    await prisma.$disconnect();
  }
}

bootstrap();
