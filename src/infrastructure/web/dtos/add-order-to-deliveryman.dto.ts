import { IsString, IsNotEmpty } from 'class-validator';
import { AddOrderToDeliverymanDto } from 'src/domain/deliveryman/ports/in/add-order-to-deliveryman.use-case';

export class AddOrderToDeliverymanNestDto implements AddOrderToDeliverymanDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;
}
