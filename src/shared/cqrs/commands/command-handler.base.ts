import { AggregateRoot, EventPublisher, IEvent } from "@nestjs/cqrs/dist";
import { LoggerService, LoggerWithContext } from "@shared/modules/loggers/logger.service";
import { Logger } from "log4js";
import { BaseAggregateRoot } from '../aggregate_root_base/aggregate-root.base';
import { BaseDocument, BaseSchema } from "@shared/models/base.entity";
import { extend } from 'joi';
import { ObjectId } from 'mongoose';
import { RequestContextService } from "infra/application/context/AppRequestContext";

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