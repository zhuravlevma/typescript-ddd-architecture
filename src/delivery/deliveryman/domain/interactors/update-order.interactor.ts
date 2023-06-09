import { DeliverymanEntity } from '../entities/deliveryman.entity';
import {
  UpdateOrderCommand,
  UpdateOrderUseCase,
} from '../ports/in/update-order.use-case';
import { FindDeliverymanOrderLadingPort } from '../ports/out/find-deliveryman-order-lading.port';
import { SaveDeliverymanPort } from '../ports/out/save-deliveryman.port';

export class UpdateOrderInteractor implements UpdateOrderUseCase {
  constructor(
    private readonly findDeliverymanPort: FindDeliverymanOrderLadingPort,
    private readonly saveDeliverymanPort: SaveDeliverymanPort,
  ) {}

  async execute(
    updateOrderStatusDto: UpdateOrderCommand,
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
