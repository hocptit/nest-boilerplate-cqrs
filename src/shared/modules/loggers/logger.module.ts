import { Global, Module } from '@nestjs/common';

import { LoggerService } from '@shared/modules/loggers/logger.service';

@Global()
@Module({
  imports: [],
  providers: [LoggerService],
  exports: [LoggerService],
})
export class LoggingModule {}
