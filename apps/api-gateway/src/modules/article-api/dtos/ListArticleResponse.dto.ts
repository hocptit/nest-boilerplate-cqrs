import {
  ListArticleResponse,
  ListArticleResponse_Articles,
} from '@assets/proto/learning/learning';
import { ApiProperty } from '@nestjs/swagger';

class ListArticleResponseDto_Articles implements ListArticleResponse_Articles {
  @ApiProperty({ type: String })
  id: string;
  @ApiProperty({ type: String })
  authorId: string;
  @ApiProperty({ type: String })
  content: string;
  @ApiProperty({ type: String })
  title: string;
}
export class ListArticleResponseDto implements ListArticleResponse {
  @ApiProperty({ type: ListArticleResponseDto_Articles, isArray: true })
  articles: ListArticleResponseDto_Articles[];
}
