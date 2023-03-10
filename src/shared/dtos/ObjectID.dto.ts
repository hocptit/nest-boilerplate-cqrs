import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsMongoId, IsString } from 'class-validator';
import { Types } from 'mongoose';
import { BadRequestException } from '@shared/exception';
export const SafeMongoIdTransform = ({ value }) => {
  try {
    if (
      Types.ObjectId.isValid(value) &&
      new Types.ObjectId(value).toString() === value
    ) {
      return value;
    }
    throw new BadRequestException({ message: 'Id validation fail' });
  } catch (error) {
    throw new BadRequestException({ message: error.message });
  }
};
export class ObjectIDDto {
  @IsMongoId()
  @IsString()
  @ApiProperty({ required: true })
  @Transform((value) => SafeMongoIdTransform(value))
  id: string;
}
