import { CurierEntity } from '../../entities/curier.entity';

export abstract class FindCurierByIdWithOrdersOutPort {
  abstract findCurierByIdWithOrders(curierId: string): Promise<CurierEntity>;
}
