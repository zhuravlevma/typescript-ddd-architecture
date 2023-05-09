import {
  CreateDeliverymanDto,
  CreateDeliverymanUseCase,
} from 'src/deliveryman/domain/ports/in/create-deliveryman.use-case';
import { DeliverymanEntity } from 'src/deliveryman/domain/entities/deliveryman.entity';
import { v4 as uuid } from 'uuid';
import { CreateDeliverymanPort } from '../ports/out/create-deliveryman.port';

export class CreateDeliverymanInteractor implements CreateDeliverymanUseCase {
  constructor(private createDeliverymanPort: CreateDeliverymanPort) {}

  execute(
    createDeliverymanDto: CreateDeliverymanDto,
  ): Promise<DeliverymanEntity> {
    return this.createDeliverymanPort.createDeliveryman(
      new DeliverymanEntity({
        id: uuid(),
        firstName: createDeliverymanDto.firstName,
        lastName: createDeliverymanDto.lastName,
        isActive: true,
        orders: [],
      }),
    );
  }
}
