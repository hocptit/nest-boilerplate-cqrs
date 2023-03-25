import { ICommand } from '@nestjs/cqrs';
import { BaseCommand } from '@libs/shared';
import { CreateArticleRequest } from '@assets/proto/learning/learning';

export class CreateArticleCommand extends BaseCommand implements ICommand {
  constructor(public readonly articleDto: CreateArticleRequest) {
    super(articleDto);
  }
}
