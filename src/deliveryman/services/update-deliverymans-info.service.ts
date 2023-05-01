import {
  UpdateDeliverymansInfoDto,
  UpdateDeliverymansInfoUseCase,
} from 'src/deliveryman/ports/in/update-deliveryman-info.use-case';
import { DeliverymanEntity } from 'src/deliveryman/entities/deliveryman.entity';
import { FindDeliverymanByIdWithOrdersPort } from '../ports/out/find-deliveryman-by-id-with-orders.port';
import { SaveDeliverymanPort } from '../ports/out/save-deliveryman.port';

export class UpdateDeliverymansInfoService
  implements UpdateDeliverymansInfoUseCase
{
  constructor(
    private readonly findDeliverymanByIdWithOrdersPort: FindDeliverymanByIdWithOrdersPort,
    private readonly saveDeliverymanPort: SaveDeliverymanPort,
  ) {}

  async updateDeliverymansInfo(
    deliverymanId: string,
    updateDeliveryManDto: UpdateDeliverymansInfoDto,
  ): Promise<DeliverymanEntity> {
    try {
      const deliverymanWithOrders =
        await this.findDeliverymanByIdWithOrdersPort.findDeliverymanByIdWithOrders(
          deliverymanId,
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
