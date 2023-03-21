import { IsInt, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class PaginationDto {
  @Min(1)
  @IsInt()
  @ApiProperty({ required: true })
  limit?: number;

  @Min(1)
  @IsInt()
  @ApiProperty({ required: true })
  page?: number;
}

export const getPaginationOptions = (
  { limit = 5, page = 1 }: PaginationDto,
  sort: { sortBy: string; direction: string },
) => ({
  sort: { [sort.sortBy]: sort.direction === 'asc' ? 1 : -1 },
  limit,
  page,
});
