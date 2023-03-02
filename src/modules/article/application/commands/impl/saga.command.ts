import { CreateArticleDto } from '@modules/article/dtos/CreateArticle.dto';
import { ICommand } from '@nestjs/cqrs';

export class SagaCommand implements ICommand {
  constructor(public readonly articleDto: CreateArticleDto) {}
}
