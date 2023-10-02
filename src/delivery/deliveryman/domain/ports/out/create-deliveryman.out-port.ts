import { DeliverymanEntity } from '../../entities/deliveryman.entity';

export abstract class CreateDeliverymanOutPort {
  abstract createDeliveryman(
    deliveryman: DeliverymanEntity,
  ): Promise<DeliverymanEntity>;
}
