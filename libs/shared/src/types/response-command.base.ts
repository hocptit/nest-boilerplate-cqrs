import { ApiProperty } from '@nestjs/swagger';
import { AggregateID } from '@libs/shared/cqrs';
export class BaseResponseCommand {
  @ApiProperty({ type: String })
  id: AggregateID;
}
