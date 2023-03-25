import { CreateArticleDto } from '@app/learning/modules/article/dtos/CreateArticle.dto';
import { ICommand } from '@nestjs/cqrs';
import { BaseCommand } from '@libs/shared';

export class CreateArticleCommand extends BaseCommand implements ICommand {
  constructor(public readonly articleDto: CreateArticleDto) {
    super(articleDto);
  }
}
