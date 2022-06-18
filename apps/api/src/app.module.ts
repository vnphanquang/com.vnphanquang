import { Module } from '@nestjs/common';

import { ConfigModule } from '$config/index';
import { AuthenticationModule } from '$services/authentication';
import { GraphqlModule } from '$services/graphql';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [ConfigModule, GraphqlModule, AuthenticationModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
