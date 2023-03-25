import { GetArticleResponse } from '@assets/proto/learning/learning';
import { ApiProperty } from '@nestjs/swagger';

export class GetArticleResponseDto implements GetArticleResponse {
  @ApiProperty({ type: String })
  id: string;
  @ApiProperty({ type: String })
  content: string;
  @ApiProperty({ type: String })
  title: string;
}
