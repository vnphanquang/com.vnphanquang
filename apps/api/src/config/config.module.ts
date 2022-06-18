import { Module } from '@nestjs/common';

import { ConfigDynamicModule, ConfigService } from './config.service';

@Module({
  imports: [ConfigDynamicModule],
  providers: [ConfigService],
  exports: [ConfigService],
})
export class ConfigModule {}
