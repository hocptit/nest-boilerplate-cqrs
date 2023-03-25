import { ArticlesService } from '@app/learning/modules/article/services/article.service';
import {
  ArticleServiceController,
  CreateArticleRequest,
  CreateArticleResponse,
  GetArticleRequest,
  GetArticleResponse,
  ArticleServiceControllerMethods,
  ListArticleRequest,
  ListArticleResponse,
} from '@assets/proto/learning/learning';
import { Observable } from 'rxjs';
import { Controller } from '@nestjs/common';

@Controller('article')
@ArticleServiceControllerMethods()
export class ArticleController implements ArticleServiceController {
  constructor(private readonly articleService: ArticlesService) {}

  createArticle(
    request: CreateArticleRequest,
  ):
    | Promise<CreateArticleResponse>
    | Observable<CreateArticleResponse>
    | CreateArticleResponse {
    return this.articleService.createArticle({
      title: request.title,
      content: request.content,
    });
  }

  getArticle(
    request: GetArticleRequest,
  ):
    | Promise<GetArticleResponse>
    | Observable<GetArticleResponse>
    | GetArticleResponse {
    return this.articleService.findById(request.id);
  }

  listArticle(
    request: ListArticleRequest,
  ):
    | Promise<ListArticleResponse>
    | Observable<ListArticleResponse>
    | ListArticleResponse {
    return this.articleService.findAll(request);
  }
}
