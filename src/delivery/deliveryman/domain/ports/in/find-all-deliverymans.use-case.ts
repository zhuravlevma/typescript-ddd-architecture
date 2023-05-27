import { DeliverymanEntity } from '../../entities/deliveryman.entity';

export abstract class FindAllDeliverymansQuery {
  abstract execute(): Promise<DeliverymanEntity[]>;
}
