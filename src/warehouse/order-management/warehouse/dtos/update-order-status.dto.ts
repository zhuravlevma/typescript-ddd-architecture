import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsBoolean } from 'class-validator';

export class UpdateOrderStatusDto {
  @ApiProperty()
  @IsBoolean()
  @IsNotEmpty()
  isValid: boolean;
}
