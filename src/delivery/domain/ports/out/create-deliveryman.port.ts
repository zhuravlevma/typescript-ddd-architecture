import { DeliverymanEntity } from '../../entities/deliveryman.entity';

export interface CreateDeliverymanPort {
  createDeliveryMan(deliveryman: DeliverymanEntity);
}
