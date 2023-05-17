import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
export class UpdateDeliverymansOrdersNestDto {
  @ApiProperty()
  @IsString()
  @IsOptional()
  description?: string;
}
