import { CurierEntity } from '../../entities/curier.entity';

export interface CreateOrderCommand {
  id: string;
}
export abstract class CreateOrderInPort {
  abstract execute(
    createOrderCommand: CreateOrderCommand,
  ): Promise<CurierEntity>;
}
