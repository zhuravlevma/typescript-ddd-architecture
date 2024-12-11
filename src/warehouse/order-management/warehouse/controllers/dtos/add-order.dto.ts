import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsBoolean } from 'class-validator';

export class AddOrderDto {
  @ApiProperty({ type: 'string' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ type: 'string', format: 'uuid' })
  @IsString()
  @IsNotEmpty()
  orderId: string;

  @ApiProperty({ type: 'boolean' })
  @IsBoolean()
  @IsNotEmpty()
  isValid: boolean;
}
