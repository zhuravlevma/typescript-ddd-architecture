import { CreateCurierOutPort } from '../ports/out/create-curier.out-port';
import { CurierEntity } from '../entities/curier.entity';
import {
  CreateCurierInPort,
  CreateCurierParams,
} from '../ports/in/create-curier.in-port';
import { randomUUID } from 'crypto';

export class CreateCurierInteractor implements CreateCurierInPort {
  constructor(private readonly createCurierPort: CreateCurierOutPort) {}

  execute(createCurierParams: CreateCurierParams): Promise<CurierEntity> {
    return this.createCurierPort.createCurier(
      new CurierEntity({
        id: randomUUID(),
        firstName: createCurierParams.firstName,
        lastName: createCurierParams.lastName,
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
