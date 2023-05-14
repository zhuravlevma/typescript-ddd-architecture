import { DeliverymanEntity } from 'src/delivery/deliveryman/domain/entities/deliveryman.entity';
import { FindAllDeliverymansUseCase } from 'src/delivery/deliveryman/domain/ports/in/find-all-deliverymans.use-case';
import { FindAllDeliverymansPort } from '../ports/out/find-all-deliverymans.port';

export class FindAllDeliverymansInteractor
  implements FindAllDeliverymansUseCase
{
  constructor(
    private readonly findAllDeliverymansPort: FindAllDeliverymansPort,
  ) {}

  execute(): Promise<DeliverymanEntity[]> {
    return this.findAllDeliverymansPort.findAllDeliveryMans();
  }
}
