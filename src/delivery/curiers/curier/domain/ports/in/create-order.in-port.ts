import { DeliverymanEntity } from '../../entities/deliveryman.entity';

export interface CreateOrderCommand {
  id: string;
}
export abstract class CreateOrderInPort {
  abstract execute(
    createOrderCommand: CreateOrderCommand,
  ): Promise<DeliverymanEntity>;
}
