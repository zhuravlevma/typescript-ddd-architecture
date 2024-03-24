import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsBoolean } from 'class-validator';

export class UpdateOrderDto {
  @ApiProperty({ type: 'boolean' })
  @IsBoolean()
  @IsNotEmpty()
  isValid: boolean;
}
