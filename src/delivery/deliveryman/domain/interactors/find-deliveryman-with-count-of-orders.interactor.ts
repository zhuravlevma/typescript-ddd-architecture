import {
  FindDeliverymanWithCountOfOrdersQuery,
  FindDeliverymanWithCountOfOrdersParams,
} from '../ports/in/find-deliveryman-with-count-of-orders.query';
import { FindDeliverymanWithCountOfOrdersPort } from '../ports/out/find-deliveryman-with-count-of-orders.port';
import { DeliverymanWithCountOfOrders } from '../read-models/deliveryman-with-count-of-orders.model';

export class FindDeliverymanWithCountOfOrdersInteractor
  implements FindDeliverymanWithCountOfOrdersQuery
{
  constructor(
    private readonly findAllDeliverymansPort: FindDeliverymanWithCountOfOrdersPort,
  ) {}

  execute(
    findDeliverymanWithCountOfOrdersParams: FindDeliverymanWithCountOfOrdersParams,
  ): Promise<DeliverymanWithCountOfOrders> {
    return this.findAllDeliverymansPort.findDeliverymanWithCountOfOrdersPort(
      findDeliverymanWithCountOfOrdersParams.deliverymanId,
    );
  }
}
