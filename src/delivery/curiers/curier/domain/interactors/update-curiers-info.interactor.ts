import { FindCurierByIdWithOrdersOutPort } from '../ports/out/find-curier-by-id-with-orders.out-port';
import { SaveCurierOutPort } from '../ports/out/save-curier.out-port';
import { CurierEntity } from '../entities/curier.entity';
import {
  UpdateCuriersInPort,
  UpdateCuriersInfoParams,
} from '../ports/in/update-curier-info.in-port';

export class UpdateCuriersInfoInteractor implements UpdateCuriersInPort {
  constructor(
    private readonly findCurierByIdWithOrdersPort: FindCurierByIdWithOrdersOutPort,
    private readonly saveCurierPort: SaveCurierOutPort,
  ) {}

  async execute(
    updateCurierParams: UpdateCuriersInfoParams,
  ): Promise<CurierEntity> {
    try {
      const curierWithOrders =
        await this.findCurierByIdWithOrdersPort.findCurierByIdWithOrders(
          updateCurierParams.curierId,
        );

      if (updateCurierParams.firstName !== undefined) {
        curierWithOrders.changeFirstName(updateCurierParams.firstName);
      }
      if (updateCurierParams.lastName !== undefined) {
        curierWithOrders.changeLastName(updateCurierParams.lastName);
      }

      return await this.saveCurierPort.save(curierWithOrders);
    } catch (error) {
      return error.message;
    }
  }
}
