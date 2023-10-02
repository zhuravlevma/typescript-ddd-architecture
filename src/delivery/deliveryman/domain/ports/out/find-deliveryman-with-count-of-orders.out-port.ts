import { DeliverymanWithCountOfOrders } from '../../read-models/deliveryman-with-count-of-orders.model';

export abstract class FindDeliverymanWithCountOfOrdersOutPort {
  abstract findDeliverymanWithCountOfOrdersPort(
    deliverymanId: string,
  ): Promise<DeliverymanWithCountOfOrders>;
}
