import { EventPublisher } from "@nestjs/cqrs/dist";
import { LoggerService, LoggerWithContext } from "@shared/modules/loggers/logger.service";
import { BaseAggregateRoot } from '../aggregate_root_base/aggregate-root.base';
import { BaseSchema } from "@shared/models/base.entity";

export class BaseCommandHandler {
  protected logger: LoggerWithContext;
  constructor(
    protected readonly publisher: EventPublisher,
    protected loggerService: LoggerService,
    commandName: string,
  ) {
    this.logger = new LoggerWithContext(this.loggerService.getLogger(commandName));
  }

  getAggregateRoot<T extends BaseAggregateRoot, TDocument extends BaseSchema>(
    aggregateRoot: T,
    schema: TDocument,
  ) {
    aggregateRoot.setId(schema?._id);
    aggregateRoot.setData(schema);
    return this.publisher.mergeObjectContext(aggregateRoot);
  }
}