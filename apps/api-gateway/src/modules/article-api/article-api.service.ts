import { Injectable } from '@nestjs/common';
import {
  GetArticleResponse,
  GetArticleRequest,
  CreateArticleRequest,
  CreateArticleResponse,
  ListArticleRequest,
  ListArticleResponse,
} from '@assets/proto/learning/learning';
import { ArticleService } from '@libs/grpc-client/learning/article.service';

@Injectable()
export class ArticleApiService {
  constructor(private readonly gRPCArticleService: ArticleService) {}

  getArticle(
    getArticleRequest: GetArticleRequest,
  ): Promise<GetArticleResponse> {
    return this.gRPCArticleService.getArticle(getArticleRequest);
  }
  listArticle(
    listArticleRequest: ListArticleRequest,
  ): Promise<ListArticleResponse> {
    return this.gRPCArticleService.listArticle(listArticleRequest);
  }

  createArticle(
    createArticleRequest: CreateArticleRequest,
  ): Promise<CreateArticleResponse> {
    return this.gRPCArticleService.createArticle(createArticleRequest);
  }
}
