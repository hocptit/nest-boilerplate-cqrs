/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from '@nestjs/microservices';
import { Observable } from 'rxjs';

export const protobufPackage = 'learning';

/**
 * import "google/protobuf/empty.proto";
 * import "google/protobuf/any.proto";
 */

export interface GetLearningRequest {
  name: string;
}

export interface GetLearningResponse {
  message: string;
}

export interface GetArticleRequest {
  id: string;
}

export interface GetArticleResponse {
  id: string;
  content: string;
  title: string;
}

export interface CreateArticleRequest {
  content: string;
  /** repeated google.protobuf.Any meta = 4; */
  title: string;
  test?: number | undefined;
  test2?: string | undefined;
}

export interface CreateArticleResponse {
  id: string;
}

export interface ListArticleRequest {
  content?: string | undefined;
  author?: string | undefined;
}

export interface ListArticleResponse {
  articles: ListArticleResponse_Articles[];
}

export interface ListArticleResponse_Articles {
  id: string;
  authorId: string;
  content: string;
  title: string;
}

export const LEARNING_PACKAGE_NAME = 'learning';

/** Learning main Service */

export interface LearningServiceClient {
  getLearning(request: GetLearningRequest): Observable<GetLearningResponse>;
}

/** Learning main Service */

export interface LearningServiceController {
  getLearning(
    request: GetLearningRequest,
  ):
    | Promise<GetLearningResponse>
    | Observable<GetLearningResponse>
    | GetLearningResponse;
}

export function LearningServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ['getLearning'];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(
        constructor.prototype,
        method,
      );
      GrpcMethod('LearningService', method)(
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
      GrpcStreamMethod('LearningService', method)(
        constructor.prototype[method],
        method,
        descriptor,
      );
    }
  };
}

export const LEARNING_SERVICE_NAME = 'LearningService';

/** Article Service */

export interface ArticleServiceClient {
  getArticle(request: GetArticleRequest): Observable<GetArticleResponse>;

  createArticle(
    request: CreateArticleRequest,
  ): Observable<CreateArticleResponse>;

  listArticle(request: ListArticleRequest): Observable<ListArticleResponse>;
}

/** Article Service */

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
    | Promise<CreateArticleResponse>
    | Observable<CreateArticleResponse>
    | CreateArticleResponse;

  listArticle(
    request: ListArticleRequest,
  ):
    | Promise<ListArticleResponse>
    | Observable<ListArticleResponse>
    | ListArticleResponse;
}

export function ArticleServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = [
      'getArticle',
      'createArticle',
      'listArticle',
    ];
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
