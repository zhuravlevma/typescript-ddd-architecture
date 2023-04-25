import { IsString, IsNotEmpty } from 'class-validator';
import { AddOrderToDeliverymanDto } from 'src/delivery/domain/ports/in/add-order-to-deliveryman.use-case';

export class CreateOrderDto implements AddOrderToDeliverymanDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;
}
