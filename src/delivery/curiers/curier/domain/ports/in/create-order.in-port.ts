import { CurierEntity } from '../../entities/curier.entity';

export interface CreateOrderParams {
  id: string;
}
export abstract class CreateOrderInPort {
  abstract execute(createOrderParams: CreateOrderParams): Promise<CurierEntity>;
}
