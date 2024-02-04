import { OrderEntity } from '../entities/order.entity';
import { FindCurierByIdWithOrdersOutPort } from '../ports/out/find-curier-by-id-with-orders.out-port';
import { SaveCurierOutPort } from '../ports/out/save-curier.out-port';
import { CurierEntity } from '../entities/curier.entity';
import {
  AddOrderToCurierInPort as AddOrderToCurierInPort,
  AddOrderToCurierCommand,
} from '../ports/in/add-order-to-curier.in-port';
import { randomUUID } from 'crypto';

export class AddOrderToCurierInteractor implements AddOrderToCurierInPort {
  constructor(
    private readonly findCurierByIdWithOrdersPort: FindCurierByIdWithOrdersOutPort,
    private readonly saveCurierPort: SaveCurierOutPort,
  ) {}

  async execute(
    addOrderToCurierCommand: AddOrderToCurierCommand,
  ): Promise<CurierEntity> {
    try {
      const curiernWithOrders =
        await this.findCurierByIdWithOrdersPort.findCurierByIdWithOrders(
          addOrderToCurierCommand.curierId,
        );

      curiernWithOrders.addOrder(
        new OrderEntity({
          id: randomUUID(),
          name: 'test name',
          description: 'test descr',
          isActive: false,
          orderId: addOrderToCurierCommand.orderId,
          totalSum: 0,
          weight: 1,
          curierId: addOrderToCurierCommand.curierId,
        }),
      );
      return await this.saveCurierPort.save(curiernWithOrders);
    } catch (error) {
      return error.message;
    }
  }
}
