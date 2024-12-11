import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class AddOrderToCurierDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  curierId: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  orderId: string;
}
