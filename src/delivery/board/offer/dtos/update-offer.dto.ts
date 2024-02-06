import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateOfferDto {
  @ApiProperty({ type: 'string', format: 'uuid' })
  @IsString()
  @IsNotEmpty()
  curierId: string;
}
