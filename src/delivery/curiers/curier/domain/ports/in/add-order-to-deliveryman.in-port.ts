import { DeliverymanEntity } from '../../entities/deliveryman.entity';

export interface AddOrderToDeliverymanCommand {
  deliverymanId: string;
  orderId: string;
}
export abstract class AddOrderToDeliverymanInPort {
  abstract execute(
    addOrderToDeliverymanCommand: AddOrderToDeliverymanCommand,
  ): Promise<DeliverymanEntity>;
}
