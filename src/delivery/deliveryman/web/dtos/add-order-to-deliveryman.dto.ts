import { IsString, IsNotEmpty } from 'class-validator';

export class AddOrderToDeliverymanNestDto {
  @IsString()
  @IsNotEmpty()
  deliverymanId: string;

  @IsString()
  @IsNotEmpty()
  orderId: string;
}
