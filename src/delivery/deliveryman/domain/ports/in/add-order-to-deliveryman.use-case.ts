import { DeliverymanEntity } from '../../entities/deliveryman.entity';

export interface AddOrderToDeliverymanDto {
  deliverymanId: string;
  orderId: string;
}
export abstract class AddOrderToDeliverymanUseCase {
  abstract execute(
    addOrderToDeliverymanDto: AddOrderToDeliverymanDto,
  ): Promise<DeliverymanEntity>;
}
