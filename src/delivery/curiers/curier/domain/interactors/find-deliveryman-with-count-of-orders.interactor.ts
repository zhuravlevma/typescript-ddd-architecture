import {
  FindDeliverymanWithCountOfInPort,
  FindDeliverymanWithCountOfOrdersParams,
} from '../ports/in/find-deliveryman-with-count-of-orders.in-port';
import { FindDeliverymanWithCountOfOrdersOutPort } from '../ports/out/find-deliveryman-with-count-of-orders.out-port';
import { DeliverymanWithCountOfOrders } from '../read-models/deliveryman-with-count-of-orders.model';

export class FindDeliverymanWithCountOfOrdersInteractor
  implements FindDeliverymanWithCountOfInPort
{
  constructor(
    private readonly findAllDeliverymansPort: FindDeliverymanWithCountOfOrdersOutPort,
  ) {}

  execute(
    findDeliverymanWithCountOfOrdersParams: FindDeliverymanWithCountOfOrdersParams,
  ): Promise<DeliverymanWithCountOfOrders> {
    return this.findAllDeliverymansPort.findDeliverymanWithCountOfOrdersPort(
      findDeliverymanWithCountOfOrdersParams.deliverymanId,
    );
  }
}
