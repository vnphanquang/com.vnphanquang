import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';

import { WebWordFrequencyController } from './webwordfrequency.controller';

@Module({
  imports: [HttpModule],
  controllers: [WebWordFrequencyController],
})
export class WebWordFrequencyModule {}
