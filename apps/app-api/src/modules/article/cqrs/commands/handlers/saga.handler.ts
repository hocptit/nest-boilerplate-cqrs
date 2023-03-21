import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { SagaCommand } from '../impl/saga.command';

@CommandHandler(SagaCommand)
export class SagaHandler implements ICommandHandler<SagaCommand> {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async execute(_command: SagaCommand) {
    console.log('SagaHandler');
  }
}
