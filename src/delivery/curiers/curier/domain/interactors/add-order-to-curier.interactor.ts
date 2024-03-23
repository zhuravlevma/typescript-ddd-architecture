import { OrderEntity } from '../entities/order.entity';
import { FindCurierByIdWithOrdersOutPort } from '../ports/out/find-curier-by-id-with-orders.out-port';
import { SaveCurierOutPort } from '../ports/out/save-curier.out-port';
import { CurierEntity } from '../entities/curier.entity';
import {
  AddOrderToCurierInPort as AddOrderToCurierInPort,
  AddOrderToCurierParams,
} from '../ports/in/add-order-to-curier.in-port';
import { randomUUID } from 'crypto';

export class AddOrderToCurierInteractor implements AddOrderToCurierInPort {
  constructor(
    private readonly findCurierByIdWithOrdersPort: FindCurierByIdWithOrdersOutPort,
    private readonly saveCurierPort: SaveCurierOutPort,
  ) {}

  async execute(
    addOrderToCurierParams: AddOrderToCurierParams,
  ): Promise<CurierEntity> {
    try {
      const curiernWithOrders =
        await this.findCurierByIdWithOrdersPort.findCurierByIdWithOrders(
          addOrderToCurierParams.curierId,
        );

      curiernWithOrders.addOrder(
        new OrderEntity({
          id: randomUUID(),
          name: 'test name',
          description: 'test descr',
          isActive: false,
          orderId: addOrderToCurierParams.orderId,
          totalSum: 0,
          weight: 1,
          curierId: addOrderToCurierParams.curierId,
        }),
      );
      return await this.saveCurierPort.save(curiernWithOrders);
    } catch (error) {
      return error.message;
    }
  }
}
