import { Module } from '@nestjs/common';
import { LearningModule } from '@libs/grpc-client/learning';
import { ArticleApiController } from '@app/modules/article-api/article-api.controller';
import { ArticleApiService } from '@app/modules/article-api/article-api.service';

@Module({
  imports: [LearningModule],
  controllers: [ArticleApiController],
  providers: [ArticleApiService],
})
export class ArticleApiModule {}
