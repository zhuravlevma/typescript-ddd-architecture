import { DeliverymanEntity } from '../../entities/deliveryman.entity';

export interface FindDeliverymanByIdWithOrdersPort {
  findDeliverymanByIdWithOrders(
    deliverymanId: number,
  ): Promise<DeliverymanEntity>;
}
