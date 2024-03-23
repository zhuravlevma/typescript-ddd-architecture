import { CurierEntity } from '../../entities/curier.entity';

export interface UpdateOrderParams {
  curierId: string;
  orderId: string;
  description?: string;
  delivered?: boolean;
  returned?: boolean;
}
export abstract class UpdateOrderInPort {
  abstract execute(updateOrderStatusParams: UpdateOrderParams): Promise<CurierEntity>;
}
