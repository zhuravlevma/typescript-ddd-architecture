import { DeliverymanEntity } from '../../entities/deliveryman.entity';

export interface FindAllDeliverymansPort {
  findAllDeliveryMans(): Promise<DeliverymanEntity[]>;
}
