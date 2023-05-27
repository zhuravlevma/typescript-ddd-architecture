import { DeliverymanWithCountOfOrders } from '../../read-models/deliveryman-with-count-of-orders.model';

export abstract class FindDeliverymanWithCountOfOrdersPort {
  abstract findDeliverymanWithCountOfOrdersPort(
    deliverymanId: string,
  ): Promise<DeliverymanWithCountOfOrders>;
}
