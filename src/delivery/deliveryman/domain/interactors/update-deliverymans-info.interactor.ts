import { FindDeliverymanByIdWithOrdersPort } from '../ports/out/find-deliveryman-by-id-with-orders.port';
import { SaveDeliverymanPort } from '../ports/out/save-deliveryman.port';
import { DeliverymanEntity } from '../entities/deliveryman.entity';
import {
  UpdateDeliverymansInfoUseCase,
  UpdateDeliverymansInfoCommand,
} from '../ports/in/update-deliveryman-info.use-case';

export class UpdateDeliverymansInfoInteractor
  implements UpdateDeliverymansInfoUseCase
{
  constructor(
    private readonly findDeliverymanByIdWithOrdersPort: FindDeliverymanByIdWithOrdersPort,
    private readonly saveDeliverymanPort: SaveDeliverymanPort,
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
