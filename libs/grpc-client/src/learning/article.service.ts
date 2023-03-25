import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import {
  ArticleServiceClient,
  LEARNING_PACKAGE_NAME,
  ARTICLE_SERVICE_NAME,
  GetArticleRequest,
  GetArticleResponse,
  CreateArticleRequest,
  CreateArticleResponse,
  ListArticleRequest,
  ListArticleResponse,
} from '@assets/proto/learning/learning';
import { ClientGrpc } from '@nestjs/microservices';
import { lastValueFrom, map } from 'rxjs';

@Injectable()
export class ArticleService implements OnModuleInit {
  private articleServiceClient: ArticleServiceClient;

  constructor(@Inject(LEARNING_PACKAGE_NAME) private clientGrpc: ClientGrpc) {}

  onModuleInit(): void {
    this.articleServiceClient =
      this.clientGrpc.getService<ArticleServiceClient>(ARTICLE_SERVICE_NAME);
  }

  getArticle(
    getArticleRequest: GetArticleRequest,
  ): Promise<GetArticleResponse> {
    return lastValueFrom(
      this.articleServiceClient
        .getArticle(getArticleRequest)
        .pipe(map((response: GetArticleResponse) => response)),
    );
  }
  listArticle(
    listArticleRequest: ListArticleRequest,
  ): Promise<ListArticleResponse> {
    return lastValueFrom(
      this.articleServiceClient
        .listArticle(listArticleRequest)
        .pipe(map((response: ListArticleResponse) => response)),
    );
  }

  createArticle(
    createArticleRequest: CreateArticleRequest,
  ): Promise<CreateArticleResponse> {
    return lastValueFrom(
      this.articleServiceClient.createArticle(createArticleRequest).pipe(
        map((response: CreateArticleResponse) => response),
        // catchError((error) => {
        //   throw convertGrpcExceptionToHttpException(error);
        // }),
      ),
    );
  }
}
