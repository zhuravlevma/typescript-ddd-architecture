import { DeliverymanEntity } from '../../entities/deliveryman.entity';

export abstract class SaveDeliverymanOutPort {
  abstract save(deliveryman: DeliverymanEntity): Promise<DeliverymanEntity>;
}
