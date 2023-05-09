import { DeliverymanEntity } from '../entities/deliveryman.entity';
import {
  UpdateOrderStatusDto,
  UpdateOrderStatusUseCase,
} from '../ports/in/update-order-status.use-case';
import { FindDeliverymanOrderLadingPort } from '../ports/out/find-deliveryman-order-lading';
import { SaveDeliverymanPort } from '../ports/out/save-deliveryman.port';

export class UpdateOrderStatusInteractor implements UpdateOrderStatusUseCase {
  constructor(
    private readonly findDeliverymanPort: FindDeliverymanOrderLadingPort,
    private readonly saveDeliverymanPort: SaveDeliverymanPort,
  ) {}

  async execute(
    updateOrderStatusDto: UpdateOrderStatusDto,
  ): Promise<DeliverymanEntity> {
    try {
      const deliveryman =
        await this.findDeliverymanPort.findDeliverymanOrderLading(
          updateOrderStatusDto.deliverymanId,
          updateOrderStatusDto.orderId,
        );
      if (!deliveryman) {
        throw new Error('deliveryman not found');
      }

      if (updateOrderStatusDto.delivered) deliveryman.deliverOrders();

      return this.saveDeliverymanPort.save(deliveryman);
    } catch (error) {
      return error.message;
    }
  }
}
