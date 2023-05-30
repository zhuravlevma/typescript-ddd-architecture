import { v4 as uuid } from 'uuid';
import { CreateDeliverymanPort } from '../ports/out/create-deliveryman.port';
import { DeliverymanEntity } from '../entities/deliveryman.entity';
import {
  CreateDeliverymanUseCase,
  CreateDeliverymanCommand,
} from '../ports/in/create-deliveryman.use-case';

export class CreateDeliverymanInteractor implements CreateDeliverymanUseCase {
  constructor(private readonly createDeliverymanPort: CreateDeliverymanPort) {}

  execute(
    createDeliverymanCommand: CreateDeliverymanCommand,
  ): Promise<DeliverymanEntity> {
    return this.createDeliverymanPort.createDeliveryman(
      new DeliverymanEntity({
        id: uuid(),
        firstName: createDeliverymanCommand.firstName,
        lastName: createDeliverymanCommand.lastName,
        isActive: true,
        orders: [],
      }),
    );
  }
}
