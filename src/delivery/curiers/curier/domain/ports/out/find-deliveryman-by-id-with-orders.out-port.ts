import { DeliverymanEntity } from '../../entities/deliveryman.entity';

export abstract class FindDeliverymanByIdWithOrdersOutPort {
  abstract findDeliverymanByIdWithOrders(
    deliverymanId: string,
  ): Promise<DeliverymanEntity>;
}
