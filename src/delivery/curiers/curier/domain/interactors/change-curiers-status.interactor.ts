import {
  ChangeCuriersStatusCommand,
  ChangeCuriersStatusInPort,
} from 'src/delivery/curiers/curier/domain/ports/in/change-curiers-status.in-port';
import { SaveCurierOutPort } from '../ports/out/save-curier.out-port';
import { FindCurierByIdWithOrdersOutPort } from '../ports/out/find-curier-by-id-with-orders.out-port';
import { CurierEntity } from '../entities/curier.entity';

export class ChangeCuriersStatusInteractor
  implements ChangeCuriersStatusInPort
{
  constructor(
    private readonly findCurierByIdWithOrdersPort: FindCurierByIdWithOrdersOutPort,
    private readonly saveCurierPort: SaveCurierOutPort,
  ) {}

  async execute(
    changeCuriersStatusCommand: ChangeCuriersStatusCommand,
  ): Promise<CurierEntity> {
    try {
      const curierWithOrders =
        await this.findCurierByIdWithOrdersPort.findCurierByIdWithOrders(
          changeCuriersStatusCommand.curierId,
        );

      curierWithOrders.changeStatus(changeCuriersStatusCommand.isActive);

      return await this.saveCurierPort.save(curierWithOrders);
    } catch (error) {
      return error.message;
    }
  }
}
