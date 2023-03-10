import { IEvent } from '@nestjs/cqrs';
import { BaseEvent } from '@shared/cqrs/events/event.base';
import { CreateArticleDto } from '../../../dtos/CreateArticle.dto';

export class ArticleCreatedEvent extends BaseEvent implements IEvent {
  constructor(public readonly articleDto: CreateArticleDto) {
    super();
  }
}
