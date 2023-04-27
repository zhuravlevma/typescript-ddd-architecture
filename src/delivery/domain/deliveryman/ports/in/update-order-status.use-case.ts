import { DeliverymanEntity } from '../../entities/deliveryman.entity';

export interface UpdateOrderStatusDto {
  delivered: boolean;
  returned: boolean;
}

export abstract class UpdateOrderStatusUseCase {
  abstract updateOrderStatus(
    deliverymanId: string,
    orderId: string,
  ): Promise<DeliverymanEntity>;
}
