import { CurierEntity } from '../../entities/curier.entity';

export interface AddOrderToCurierCommand {
  curierId: string;
  orderId: string;
}
export abstract class AddOrderToCurierInPort {
  abstract execute(
    addOrderToCurierCommand: AddOrderToCurierCommand,
  ): Promise<CurierEntity>;
}
