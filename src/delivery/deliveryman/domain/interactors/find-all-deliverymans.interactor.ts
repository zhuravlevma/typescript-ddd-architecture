import { DeliverymanEntity } from '../entities/deliveryman.entity';
import { FindAllDeliverymansQuery } from '../ports/in/find-all-deliverymans.use-case';
import { FindAllDeliverymansPort } from '../ports/out/find-all-deliverymans.port';

export class FindAllDeliverymansInteractor implements FindAllDeliverymansQuery {
  constructor(
    private readonly findAllDeliverymansPort: FindAllDeliverymansPort,
  ) {}

  execute(): Promise<DeliverymanEntity[]> {
    return this.findAllDeliverymansPort.findAllDeliveryMans();
  }
}
