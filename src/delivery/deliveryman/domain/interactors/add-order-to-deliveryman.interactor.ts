import {
  AddOrderToDeliverymanCommand,
  AddOrderToDeliverymanUseCase,
} from 'src/delivery/deliveryman/domain/ports/in/add-order-to-deliveryman.use-case';
import { DeliverymanEntity } from 'src/delivery/deliveryman/domain/entities/deliveryman.entity';
import { v4 as uuid } from 'uuid';
import { OrderEntity } from '../entities/order.entity';
import { FindDeliverymanByIdWithOrdersPort } from '../ports/out/find-deliveryman-by-id-with-orders.port';
import { SaveDeliverymanPort } from '../ports/out/save-deliveryman.port';

export class AddOrderToDeliverymanInteractor
  implements AddOrderToDeliverymanUseCase
{
  constructor(
    private readonly findDeliverymanByIdWithOrdersPort: FindDeliverymanByIdWithOrdersPort,
    private readonly saveDeliverymanPort: SaveDeliverymanPort,
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
          id: uuid(),
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
