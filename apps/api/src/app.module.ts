import { Module } from '@nestjs/common';

import { ConfigModule } from '$config/index';
import { AuthenticationModule } from '$services/authentication';
import { GraphqlModule } from '$services/graphql';
import { WebWordFrequencyModule } from '$services/webwordfrequency';

@Module({
  imports: [ConfigModule, GraphqlModule, AuthenticationModule, WebWordFrequencyModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
