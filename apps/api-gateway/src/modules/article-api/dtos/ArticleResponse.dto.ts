import {
  CreateArticleResponse,
  GetArticleResponse,
} from '@assets/proto/learning/learning';

export class ArticleResponseDto implements GetArticleResponse {
  id: string;
  content: string;
  title: string;
}
