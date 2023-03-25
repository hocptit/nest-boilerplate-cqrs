import { IEvent } from '@nestjs/cqrs';
import { BaseEvent } from '@libs/shared';
import { CreateArticleRequest } from '@assets/proto/learning/learning';

export class ArticleCreatedEvent extends BaseEvent implements IEvent {
  constructor(public readonly articleDto: CreateArticleRequest) {
    super();
  }
}
