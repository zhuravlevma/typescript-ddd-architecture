import { Injectable } from '@nestjs/common';
import { DeliverymanEntity } from 'src/delivery/domain/deliveryman/entities/deliveryman.entity';
import { FindAllDeliverymansUseCase } from 'src/delivery/domain/deliveryman/ports/in/find-all-deliverymans.use-case';
import { FindAllDeliverymansPort } from '../ports/out/find-all-deliverymans.port';

@Injectable()
export class FindAllDeliverymansService implements FindAllDeliverymansUseCase {
  constructor(private findAllDeliverymansPort: FindAllDeliverymansPort) {}

  findAll(): Promise<DeliverymanEntity[]> {
    return this.findAllDeliverymansPort.findAllDeliveryMans();
  }
}
