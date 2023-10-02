import { DeliverymanEntity } from '../entities/deliveryman.entity';
import {
  UpdateOrderCommand,
  UpdateOrderInPort,
} from '../ports/in/update-order.in-port';
import { FindDeliverymanOrderLadingOutPort } from '../ports/out/find-deliveryman-order-lading.out-port';
import { SaveDeliverymanOutPort } from '../ports/out/save-deliveryman.out-port';

export class UpdateOrderInteractor implements UpdateOrderInPort {
  constructor(
    private readonly findDeliverymanPort: FindDeliverymanOrderLadingOutPort,
    private readonly saveDeliverymanPort: SaveDeliverymanOutPort,
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
