import { IEvent } from '@nestjs/cqrs';
import { BaseEvent } from '@shared/cqrs/events/event.base';

export class ArticleCreatedEvent extends BaseEvent implements IEvent {
  constructor(public readonly articleDto: any) {
    super();
  }
}
