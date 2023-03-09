import { CreateArticleDto } from '@modules/article/dtos/CreateArticle.dto';
import { ICommand } from '@nestjs/cqrs';
import { BaseCommand } from '@shared/cqrs/commands/command.base';

export class CreateArticleCommand extends BaseCommand implements ICommand {
  constructor(public readonly articleDto: CreateArticleDto) {
    super(articleDto);
  }
}
