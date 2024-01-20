import { CreateDeliverymanOutPort } from '../ports/out/create-deliveryman.out-port';
import { DeliverymanEntity } from '../entities/deliveryman.entity';
import {
  CreateDeliverymanInPort,
  CreateDeliverymanCommand,
} from '../ports/in/create-deliveryman.in-port';
import { randomUUID } from 'crypto';

export class CreateDeliverymanInteractor implements CreateDeliverymanInPort {
  constructor(
    private readonly createDeliverymanPort: CreateDeliverymanOutPort,
  ) {}

  execute(
    createDeliverymanCommand: CreateDeliverymanCommand,
  ): Promise<DeliverymanEntity> {
    return this.createDeliverymanPort.createDeliveryman(
      new DeliverymanEntity({
        id: randomUUID(),
        firstName: createDeliverymanCommand.firstName,
        lastName: createDeliverymanCommand.lastName,
        email: 'email',
        phone: 8990099033,
        vehicleType: 'bike',
        workingHours: 10,
        rating: 0,
        deliveryCapacity: 2,
        specialization: 'food',
        commissionRate: 10,
        paymentDetails: 93321331332,
        isActive: true,
        orders: [],
      }),
    );
  }
}
