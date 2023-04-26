import { DeliverymanEntity } from '../../entities/deliveryman.entity';

export interface SaveDeliverymanPort {
  save(deliveryman: DeliverymanEntity): Promise<DeliverymanEntity>;
}
