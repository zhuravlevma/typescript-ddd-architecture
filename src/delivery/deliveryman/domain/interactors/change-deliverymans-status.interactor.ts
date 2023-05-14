import {
  ChangeDeliverymansStatusDto,
  ChangeDeliverymansStatusUseCase,
} from 'src/delivery/deliveryman/domain/ports/in/change-deliverymans-status.use-case';
import { DeliverymanEntity } from 'src/delivery/deliveryman/domain/entities/deliveryman.entity';
import { SaveDeliverymanPort } from '../ports/out/save-deliveryman.port';
import { FindDeliverymanByIdWithOrdersPort } from '../ports/out/find-deliveryman-by-id-with-orders.port';

export class ChangeDeliverymansStatusInteractor
  implements ChangeDeliverymansStatusUseCase
{
  constructor(
    private readonly findDeliverymanByIdWithOrdersPort: FindDeliverymanByIdWithOrdersPort,
    private readonly saveDeliverymanPort: SaveDeliverymanPort,
  ) {}

  async execute(
    changeDeliverymansStatusDto: ChangeDeliverymansStatusDto,
  ): Promise<DeliverymanEntity> {
    try {
      const deliverymanWithOrders =
        await this.findDeliverymanByIdWithOrdersPort.findDeliverymanByIdWithOrders(
          changeDeliverymansStatusDto.deliverymanId,
        );

      deliverymanWithOrders.changeStatus(changeDeliverymansStatusDto.isActive);

      return await this.saveDeliverymanPort.save(deliverymanWithOrders);
    } catch (error) {
      return error.message;
    }
  }
}
