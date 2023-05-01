import { DeliverymanEntity } from '../entities/deliveryman.entity';
import { UpdateOrderStatusUseCase } from '../ports/in/update-order-status.use-case';
import { FindDeliverymanOrderLadingPort } from '../ports/out/find-deliveryman-order-lading';
import { SaveDeliverymanPort } from '../ports/out/save-deliveryman.port';

export class UpdateOrderStatusService implements UpdateOrderStatusUseCase {
  constructor(
    private readonly findDeliverymanPort: FindDeliverymanOrderLadingPort,
    private readonly saveDeliverymanPort: SaveDeliverymanPort,
  ) {}
  async updateOrderStatus(
    deliverymanId: string,
    orderId: string,
  ): Promise<DeliverymanEntity> {
    try {
      const deliveryman =
        await this.findDeliverymanPort.findDeliverymanOrderLading(
          deliverymanId,
          orderId,
        );
      if (!deliveryman) {
        throw new Error('deliveryman not found');
      }

      deliveryman.deliverOrders();

      return this.saveDeliverymanPort.save(deliveryman);
    } catch (error) {
      return error.message;
    }
  }
}
