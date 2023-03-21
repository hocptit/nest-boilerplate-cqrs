import { Injectable } from '@nestjs/common';
import { Command, Console } from 'nestjs-console';

@Console()
@Injectable()
export class CommandConsole {
  @Command({
    command: 'command-data',
    description: 'command pool data',
  })
  async handle(): Promise<void> {
    console.log('command...');
  }
}
