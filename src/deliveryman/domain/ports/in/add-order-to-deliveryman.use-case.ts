import { DeliverymanEntity } from '../../entities/deliveryman.entity';

export interface AddOrderToDeliverymanDto {
  deliverymanId: string;
  order: {
    name: string;
    description: string;
  };
}

export abstract class AddOrderToDeliverymanUseCase {
  abstract execute(
    addOrderToDeliverymanDto: AddOrderToDeliverymanDto,
  ): Promise<DeliverymanEntity>;
}
