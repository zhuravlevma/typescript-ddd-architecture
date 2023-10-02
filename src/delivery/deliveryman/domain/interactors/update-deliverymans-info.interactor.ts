import { FindDeliverymanByIdWithOrdersOutPort } from '../ports/out/find-deliveryman-by-id-with-orders.out-port';
import { SaveDeliverymanOutPort } from '../ports/out/save-deliveryman.out-port';
import { DeliverymanEntity } from '../entities/deliveryman.entity';
import {
  UpdateDeliverymansInPort,
  UpdateDeliverymansInfoCommand,
} from '../ports/in/update-deliveryman-info.in-port';

export class UpdateDeliverymansInfoInteractor
  implements UpdateDeliverymansInPort
{
  constructor(
    private readonly findDeliverymanByIdWithOrdersPort: FindDeliverymanByIdWithOrdersOutPort,
    private readonly saveDeliverymanPort: SaveDeliverymanOutPort,
  ) {}

  async execute(
    updateDeliveryManDto: UpdateDeliverymansInfoCommand,
  ): Promise<DeliverymanEntity> {
    try {
      const deliverymanWithOrders =
        await this.findDeliverymanByIdWithOrdersPort.findDeliverymanByIdWithOrders(
          updateDeliveryManDto.deliverymanId,
        );

      updateDeliveryManDto.firstName !== undefined ??
        (deliverymanWithOrders.firstName = updateDeliveryManDto.firstName);

      updateDeliveryManDto.lastName !== undefined ??
        (deliverymanWithOrders.lastName = updateDeliveryManDto.lastName);

      return await this.saveDeliverymanPort.save(deliverymanWithOrders);
    } catch (error) {
      return error.message;
    }
  }
}
