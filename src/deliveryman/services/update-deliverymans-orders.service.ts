import { Injectable } from '@nestjs/common';
import {
  UpdateDeliverymansOrdersUseCase,
  UpdateDeliverymansOrdersDto,
} from 'src/deliveryman/ports/in/update-deliverymans-orders.dto';
import { DeliverymanEntity } from 'src/deliveryman/entities/deliveryman.entity';
import { SaveDeliverymanPort } from '../ports/out/save-deliveryman.port';
import { FindDeliverymanByIdWithOrdersPort } from '../ports/out/find-deliveryman-by-id-with-orders.port';

@Injectable()
export class UpdateDeliverymansOrdersService
  implements UpdateDeliverymansOrdersUseCase
{
  constructor(
    private readonly findDeliverymanByIdWithOrdersPort: FindDeliverymanByIdWithOrdersPort,
    private readonly saveDeliverymanPort: SaveDeliverymanPort,
  ) {}

  async updateDeliverymansOrders(
    deliverymanId: string,
    updateDeliverymansOrdersDto: UpdateDeliverymansOrdersDto,
  ): Promise<DeliverymanEntity> {
    try {
      const deliverymanWithOrders =
        await this.findDeliverymanByIdWithOrdersPort.findDeliverymanByIdWithOrders(
          deliverymanId,
        );

      deliverymanWithOrders.addNewMessageToOrders(
        updateDeliverymansOrdersDto.description,
      );

      return await this.saveDeliverymanPort.save(deliverymanWithOrders);
    } catch (error) {
      return error.message;
    }
  }
}
