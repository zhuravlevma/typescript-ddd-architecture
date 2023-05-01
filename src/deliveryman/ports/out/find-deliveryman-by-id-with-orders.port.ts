import { DeliverymanEntity } from '../../entities/deliveryman.entity';

export abstract class FindDeliverymanByIdWithOrdersPort {
  abstract findDeliverymanByIdWithOrders(
    deliverymanId: string,
  ): Promise<DeliverymanEntity>;
}
