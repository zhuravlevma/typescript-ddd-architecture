import { DeliverymanEntity } from '../../entities/deliveryman.entity';

export abstract class SaveDeliverymanPort {
  abstract save(deliveryman: DeliverymanEntity): Promise<DeliverymanEntity>;
}
