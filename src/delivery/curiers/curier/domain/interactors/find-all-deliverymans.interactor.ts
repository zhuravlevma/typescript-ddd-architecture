import { DeliverymanEntity } from '../entities/deliveryman.entity';
import { FindAllDeliverymansInPort } from '../ports/in/find-all-deliverymans.in-port';
import { FindAllDeliverymansOutPort } from '../ports/out/find-all-deliverymans.out-port';

export class FindAllDeliverymansInteractor
  implements FindAllDeliverymansInPort
{
  constructor(
    private readonly findAllDeliverymansPort: FindAllDeliverymansOutPort,
  ) {}

  execute(): Promise<DeliverymanEntity[]> {
    return this.findAllDeliverymansPort.findAllDeliveryMans();
  }
}
