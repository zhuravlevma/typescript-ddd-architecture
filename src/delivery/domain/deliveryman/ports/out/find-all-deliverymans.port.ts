import { DeliverymanEntity } from '../../entities/deliveryman.entity';

export abstract class FindAllDeliverymansPort {
  abstract findAllDeliveryMans(): Promise<DeliverymanEntity[]>;
}
