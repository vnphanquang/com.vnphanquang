import { Module } from '@nestjs/common';

import { ConfigModule } from '$config/index';
import { GraphqlModule } from '$services/graphql';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [ConfigModule, GraphqlModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
