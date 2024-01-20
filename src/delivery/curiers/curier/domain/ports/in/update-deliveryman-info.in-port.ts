import { DeliverymanEntity } from '../../entities/deliveryman.entity';

export interface UpdateDeliverymansInfoCommand {
  deliverymanId: string;
  firstName?: string;
  lastName?: string;
  isActive?: boolean;
}
export abstract class UpdateDeliverymansInPort {
  abstract execute(
    updateDeliverymansInfoCommand: UpdateDeliverymansInfoCommand,
  ): Promise<DeliverymanEntity>;
}
