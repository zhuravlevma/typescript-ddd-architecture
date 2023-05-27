import { DeliverymanWithCountOfOrders } from '../../read-models/deliveryman-with-count-of-orders.model';

export interface FindDeliverymanWithCountOfOrdersParams {
  deliverymanId: string;
}

export abstract class FindDeliverymanWithCountOfOrdersQuery {
  abstract execute(
    findDeliverymanWithCountOfOrdersParams: FindDeliverymanWithCountOfOrdersParams,
  ): Promise<DeliverymanWithCountOfOrders>;
}
