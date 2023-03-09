import { CreateArticleHandler } from './create-article.handler';
import { SagaHandler } from './saga.handler';
import { Provider } from '@nestjs/common';

export const CommandHandlers: Provider[] = [CreateArticleHandler, SagaHandler];
