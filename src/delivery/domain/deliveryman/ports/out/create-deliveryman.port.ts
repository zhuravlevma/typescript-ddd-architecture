import { DeliverymanEntity } from '../../entities/deliveryman.entity';

export abstract class CreateDeliverymanPort {
  abstract createDeliveryman(
    deliveryman: DeliverymanEntity,
  ): Promise<DeliverymanEntity>;
}
