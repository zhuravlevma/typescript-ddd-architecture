import {
  CreateDeliverymanCommand,
  CreateDeliverymanUseCase,
} from 'src/delivery/deliveryman/domain/ports/in/create-deliveryman.use-case';
import { DeliverymanEntity } from 'src/delivery/deliveryman/domain/entities/deliveryman.entity';
import { v4 as uuid } from 'uuid';
import { CreateDeliverymanPort } from '../ports/out/create-deliveryman.port';

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
