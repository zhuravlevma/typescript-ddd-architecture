import { CurierEntity } from '../../entities/curier.entity';

export interface AddOrderToCurierParams {
  curierId: string;
  orderId: string;
}
export abstract class AddOrderToCurierInPort {
  abstract execute(addOrderToCurierParams: AddOrderToCurierParams): Promise<CurierEntity>;
}
