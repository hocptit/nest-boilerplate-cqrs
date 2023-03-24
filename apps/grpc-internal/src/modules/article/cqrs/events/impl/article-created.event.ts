import { IEvent } from '@nestjs/cqrs';
import { BaseEvent } from '@libs/shared';
import { CreateArticleDto } from '@app/modules/article/dtos/CreateArticle.dto';

export class ArticleCreatedEvent extends BaseEvent implements IEvent {
  constructor(public readonly articleDto: CreateArticleDto) {
    super();
  }
}
