import { Injectable } from '@nestjs/common';
import {
  AddOrderToDeliverymanDto,
  AddOrderToDeliverymanUseCase,
} from 'src/delivery/domain/deliveryman/ports/in/add-order-to-deliveryman.use-case';
import { DeliverymanEntity } from 'src/delivery/domain/deliveryman/entities/deliveryman.entity';
import { v4 as uuid } from 'uuid';
import { OrderEntity } from '../entities/order.entity';
import { FindDeliverymanByIdWithOrdersPort } from '../ports/out/find-deliveryman-by-id-with-orders.port';
import { SaveDeliverymanPort } from '../ports/out/save-deliveryman.port';

@Injectable()
export class AddOrderToDeliverymanService
  implements AddOrderToDeliverymanUseCase
{
  constructor(
    private readonly findDeliverymanByIdWithOrdersPort: FindDeliverymanByIdWithOrdersPort,
    private readonly saveDeliverymanPort: SaveDeliverymanPort,
  ) {}

  async addOrderToDeliveryman(
    deliverymanId: string,
    createOrderDto: AddOrderToDeliverymanDto,
  ): Promise<DeliverymanEntity> {
    try {
      const deliverymanWithOrders =
        await this.findDeliverymanByIdWithOrdersPort.findDeliverymanByIdWithOrders(
          deliverymanId,
        );

      const order = new OrderEntity({
        id: uuid(),
        name: createOrderDto.name,
        description: createOrderDto.description,
        isActive: false,
        deliverymanId,
        billOfLadingPositions: [],
      });
      order.checkName();

      deliverymanWithOrders.addOrder(order);

      return await this.saveDeliverymanPort.save(deliverymanWithOrders);
    } catch (error) {
      return error.message;
    }
  }
}
