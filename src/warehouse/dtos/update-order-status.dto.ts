import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsBoolean } from 'class-validator';

export class UpdateOrderStatusNestDto {
  @ApiProperty()
  @IsBoolean()
  @IsNotEmpty()
  isValid: boolean;
}
