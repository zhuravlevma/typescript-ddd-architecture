import { DeliverymanEntity } from '../../entities/deliveryman.entity';

export abstract class FindAllDeliverymansInPort {
  abstract execute(): Promise<DeliverymanEntity[]>;
}
