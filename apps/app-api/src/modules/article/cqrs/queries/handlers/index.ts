import { FindSingleArticleHandler } from './find-single-article.handler';
import { FindManyArticlesQueryHandler } from './find-many-article.handler';
import { Provider } from '@nestjs/common';

export const QueryHandlers: Provider[] = [
  FindSingleArticleHandler,
  FindManyArticlesQueryHandler,
];
