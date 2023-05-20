import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class AddOrderToDeliverymanDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  deliverymanId: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  orderId: string;
}
