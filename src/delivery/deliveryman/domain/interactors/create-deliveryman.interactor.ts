import { CreateDeliverymanPort } from '../ports/out/create-deliveryman.port';
import { DeliverymanEntity } from '../entities/deliveryman.entity';
import {
  CreateDeliverymanUseCase,
  CreateDeliverymanCommand,
} from '../ports/in/create-deliveryman.use-case';
import { randomUUID } from 'crypto';

export class CreateDeliverymanInteractor implements CreateDeliverymanUseCase {
  constructor(private readonly createDeliverymanPort: CreateDeliverymanPort) {}

  execute(
    createDeliverymanCommand: CreateDeliverymanCommand,
  ): Promise<DeliverymanEntity> {
    return this.createDeliverymanPort.createDeliveryman(
      new DeliverymanEntity({
        id: randomUUID(),
        firstName: createDeliverymanCommand.firstName,
        lastName: createDeliverymanCommand.lastName,
        isActive: true,
        orders: [],
      }),
    );
  }
}
