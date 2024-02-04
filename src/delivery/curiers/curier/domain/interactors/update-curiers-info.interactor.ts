import { FindCurierByIdWithOrdersOutPort } from '../ports/out/find-curier-by-id-with-orders.out-port';
import { SaveCurierOutPort } from '../ports/out/save-curier.out-port';
import { CurierEntity } from '../entities/curier.entity';
import {
  UpdateCuriersInPort,
  UpdateCuriersInfoCommand,
} from '../ports/in/update-curier-info.in-port';

export class UpdateCuriersInfoInteractor implements UpdateCuriersInPort {
  constructor(
    private readonly findCurierByIdWithOrdersPort: FindCurierByIdWithOrdersOutPort,
    private readonly saveCurierPort: SaveCurierOutPort,
  ) {}

  async execute(
    updateCurierDto: UpdateCuriersInfoCommand,
  ): Promise<CurierEntity> {
    try {
      const curierWithOrders =
        await this.findCurierByIdWithOrdersPort.findCurierByIdWithOrders(
          updateCurierDto.curierId,
        );

      updateCurierDto.firstName !== undefined ??
        (curierWithOrders.firstName = updateCurierDto.firstName);

      updateCurierDto.lastName !== undefined ??
        (curierWithOrders.lastName = updateCurierDto.lastName);

      return await this.saveCurierPort.save(curierWithOrders);
    } catch (error) {
      return error.message;
    }
  }
}
