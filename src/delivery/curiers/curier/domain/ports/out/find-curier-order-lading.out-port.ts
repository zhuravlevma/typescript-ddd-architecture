import { CurierEntity } from '../../entities/curier.entity';

export abstract class FindCurierOrderLadingOutPort {
  abstract findCurierOrderLading(curierId: string, orderId: string): Promise<CurierEntity | null>;
}
