import { CreateArticleDto } from '@modules/article/dtos/CreateArticle.dto';
import { ICommand } from '@nestjs/cqrs';

export class CreateArticleCommand implements ICommand {
  constructor(public readonly articleDto: CreateArticleDto) {}
}
