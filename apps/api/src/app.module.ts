import { Module } from '@nestjs/common';

import { ConfigModule } from '$config/index';
import { AuthenticationModule } from '$services/authentication';
import { GraphqlModule } from '$services/graphql';

@Module({
  imports: [ConfigModule, GraphqlModule, AuthenticationModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
