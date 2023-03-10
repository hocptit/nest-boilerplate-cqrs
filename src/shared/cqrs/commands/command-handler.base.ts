import { EventPublisher } from '@nestjs/cqrs/dist';
import {
  LoggerService,
  LoggerPort,
} from '@shared/modules/loggers/logger.service';
import { BaseAggregateRoot } from '../aggregate_root_base/aggregate-root.base';
import { BaseSchema } from '@shared/models/base.entity';
import { BaseDocument } from '../../models/base.entity';

export class BaseCommandHandler {
  protected logger: LoggerPort;
  constructor(
    protected loggerService: LoggerService,
    commandName: string,
  ) {
    this.logger = new LoggerPort(this.loggerService.getLogger(commandName));
  }
}
