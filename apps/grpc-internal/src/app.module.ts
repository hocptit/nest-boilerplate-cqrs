import { Module } from '@nestjs/common';
import { AppController } from '@app/grpc/app.controller';
import { AppService } from '@app/grpc/app.service';
import { MODULES } from '@app/grpc/modules';

@Module({
  imports: [...MODULES],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
