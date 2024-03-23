import { CurierEntity } from '../entities/curier.entity';
import {
  UpdateOrderParams,
  UpdateOrderInPort,
} from '../ports/in/update-order.in-port';
import { FindCurierOrderLadingOutPort } from '../ports/out/find-curier-order-lading.out-port';
import { SaveCurierOutPort } from '../ports/out/save-curier.out-port';

export class UpdateOrderInteractor implements UpdateOrderInPort {
  constructor(
    private readonly findCurierPort: FindCurierOrderLadingOutPort,
    private readonly saveCurierPort: SaveCurierOutPort,
  ) {}

  async execute(
    updateOrderStatusParams: UpdateOrderParams,
  ): Promise<CurierEntity> {
    try {
      const curier = await this.findCurierPort.findCurierOrderLading(
        updateOrderStatusParams.curierId,
        updateOrderStatusParams.orderId,
      );

      if (!curier) {
        throw new Error('curier not found');
      }

      if (updateOrderStatusParams.delivered)
        curier.completeDeliveryForAllOrders();

      return this.saveCurierPort.save(curier);
    } catch (error) {
      return error.message;
    }
  }
}
