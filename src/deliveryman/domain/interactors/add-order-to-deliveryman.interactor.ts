import {
  AddOrderToDeliverymanDto,
  AddOrderToDeliverymanUseCase,
} from 'src/deliveryman/domain/ports/in/add-order-to-deliveryman.use-case';
import { DeliverymanEntity } from 'src/deliveryman/domain/entities/deliveryman.entity';
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
    addOrderToDeliverymanDto: AddOrderToDeliverymanDto,
  ): Promise<DeliverymanEntity> {
    try {
      const deliverymanWithOrders =
        await this.findDeliverymanByIdWithOrdersPort.findDeliverymanByIdWithOrders(
          addOrderToDeliverymanDto.deliverymanId,
        );

      deliverymanWithOrders.addOrder(
        new OrderEntity({
          id: uuid(),
          name: addOrderToDeliverymanDto.order.name,
          description: addOrderToDeliverymanDto.order.description,
          isActive: false,
          deliverymanId: addOrderToDeliverymanDto.deliverymanId,
        }),
      );

      return await this.saveDeliverymanPort.save(deliverymanWithOrders);
    } catch (error) {
      return error.message;
    }
  }
}
