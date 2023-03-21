import { Module } from '@nestjs/common';

import { CommandConsole } from '@app/modules/command/command.console';

@Module({
  controllers: [],
  providers: [CommandConsole],
  exports: [],
})
export class CommandModule {}
