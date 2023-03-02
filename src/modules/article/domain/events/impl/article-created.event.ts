import { IEvent } from '@nestjs/cqrs';

export class ArticleCreatedEvent implements IEvent {
  constructor(public readonly articleDto: any) {}
}
