/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from '@nestjs/microservices';
import { Observable } from 'rxjs';

export const protobufPackage = 'article';

export interface GetArticleRequest {
  id: string;
}

export interface GetArticleResponse {
  id: string;
  content: string;
  title: string;
}

export interface CreateArticleRequest {
  id: string;
  content: string;
  title: string;
}

export interface CreateLearningResponse {
  id: string;
}

export const ARTICLE_PACKAGE_NAME = 'article';

export interface ArticleServiceClient {
  getArticle(request: GetArticleRequest): Observable<GetArticleResponse>;

  createArticle(
    request: CreateArticleRequest,
  ): Observable<CreateLearningResponse>;
}

export interface ArticleServiceController {
  getArticle(
    request: GetArticleRequest,
  ):
    | Promise<GetArticleResponse>
    | Observable<GetArticleResponse>
    | GetArticleResponse;

  createArticle(
    request: CreateArticleRequest,
  ):
    | Promise<CreateLearningResponse>
    | Observable<CreateLearningResponse>
    | CreateLearningResponse;
}

export function ArticleServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ['getArticle', 'createArticle'];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(
        constructor.prototype,
        method,
      );
      GrpcMethod('ArticleService', method)(
        constructor.prototype[method],
        method,
        descriptor,
      );
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(
        constructor.prototype,
        method,
      );
      GrpcStreamMethod('ArticleService', method)(
        constructor.prototype[method],
        method,
        descriptor,
      );
    }
  };
}

export const ARTICLE_SERVICE_NAME = 'ArticleService';
