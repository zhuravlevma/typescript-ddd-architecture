import { DeliverymanEntity } from 'src/deliveryman/entities/deliveryman.entity';
import { FindAllDeliverymansUseCase } from 'src/deliveryman/ports/in/find-all-deliverymans.use-case';
import { FindAllDeliverymansPort } from '../ports/out/find-all-deliverymans.port';

export class FindAllDeliverymansService implements FindAllDeliverymansUseCase {
  constructor(private findAllDeliverymansPort: FindAllDeliverymansPort) {}

  findAll(): Promise<DeliverymanEntity[]> {
    return this.findAllDeliverymansPort.findAllDeliveryMans();
  }
}
