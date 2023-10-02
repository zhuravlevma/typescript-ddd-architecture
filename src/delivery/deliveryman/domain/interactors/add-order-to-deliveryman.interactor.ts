import { OrderEntity } from '../entities/order.entity';
import { FindDeliverymanByIdWithOrdersOutPort } from '../ports/out/find-deliveryman-by-id-with-orders.out-port';
import { SaveDeliverymanOutPort } from '../ports/out/save-deliveryman.out-port';
import { DeliverymanEntity } from '../entities/deliveryman.entity';
import {
  AddOrderToDeliverymanInPort,
  AddOrderToDeliverymanCommand,
} from '../ports/in/add-order-to-deliveryman.in-port';
import { randomUUID } from 'crypto';

export class AddOrderToDeliverymanInteractor
  implements AddOrderToDeliverymanInPort
{
  constructor(
    private readonly findDeliverymanByIdWithOrdersPort: FindDeliverymanByIdWithOrdersOutPort,
    private readonly saveDeliverymanPort: SaveDeliverymanOutPort,
  ) {}

  async execute(
    addOrderToDeliverymanCommand: AddOrderToDeliverymanCommand,
  ): Promise<DeliverymanEntity> {
    try {
      const deliverymanWithOrders =
        await this.findDeliverymanByIdWithOrdersPort.findDeliverymanByIdWithOrders(
          addOrderToDeliverymanCommand.deliverymanId,
        );

      deliverymanWithOrders.addOrder(
        new OrderEntity({
          id: randomUUID(),
          name: 'test name',
          description: 'test descr',
          isActive: false,
          orderId: addOrderToDeliverymanCommand.orderId,
          deliverymanId: addOrderToDeliverymanCommand.deliverymanId,
        }),
      );
      return await this.saveDeliverymanPort.save(deliverymanWithOrders);
    } catch (error) {
      return error.message;
    }
  }
}
