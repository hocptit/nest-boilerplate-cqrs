import { ICommand } from '@nestjs/cqrs';
import { CreateArticleRequest } from '@assets/proto/learning/learning';

export class SagaCommand implements ICommand {
  constructor(public readonly articleDto: CreateArticleRequest) {}
}
