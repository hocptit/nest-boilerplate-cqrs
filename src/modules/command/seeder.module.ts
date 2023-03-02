import { Module } from '@nestjs/common';

import { CommandConsole } from '@modules/command/command.console';

@Module({
  controllers: [],
  providers: [CommandConsole],
  exports: [],
})
export class CommandModule {}
