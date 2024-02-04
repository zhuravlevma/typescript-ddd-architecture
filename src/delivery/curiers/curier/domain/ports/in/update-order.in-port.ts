import { CurierEntity } from '../../entities/curier.entity';

export interface UpdateOrderCommand {
  curierId: string;
  orderId: string;
  description?: string;
  delivered?: boolean;
  returned?: boolean;
}
export abstract class UpdateOrderInPort {
  abstract execute(
    updateOrderStatusCommand: UpdateOrderCommand,
  ): Promise<CurierEntity>;
}
