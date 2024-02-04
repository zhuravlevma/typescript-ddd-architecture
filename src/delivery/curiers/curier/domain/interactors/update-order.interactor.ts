import { CurierEntity } from '../entities/curier.entity';
import {
  UpdateOrderCommand,
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
    updateOrderStatusDto: UpdateOrderCommand,
  ): Promise<CurierEntity> {
    try {
      const curier = await this.findCurierPort.findCurierOrderLading(
        updateOrderStatusDto.curierId,
        updateOrderStatusDto.orderId,
      );

      if (!curier) {
        throw new Error('curier not found');
      }

      if (updateOrderStatusDto.delivered) curier.completeDeliveryForAllOrders();

      return this.saveCurierPort.save(curier);
    } catch (error) {
      return error.message;
    }
  }
}
