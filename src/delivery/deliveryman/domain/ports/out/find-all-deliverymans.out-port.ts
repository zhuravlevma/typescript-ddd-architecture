import { DeliverymanEntity } from '../../entities/deliveryman.entity';

export abstract class FindAllDeliverymansOutPort {
  abstract findAllDeliveryMans(): Promise<DeliverymanEntity[]>;
}
