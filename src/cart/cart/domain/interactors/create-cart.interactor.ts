import { CartEntity } from '../entities/cart.entity';
import { CreateCartInPort } from '../ports/in/create-cart.in-port';
import { randomUUID } from 'crypto';
import { SaveCartOutPort } from '../ports/out/save-cart.out-port';
import { CartPositionEntity } from '../entities/cart-position.entity';
import { CreateSagaOutPort } from '../ports/out/create-saga.out-port';

export class CreateCartInteractor implements CreateCartInPort {
  constructor(
    private readonly saveCartPort: SaveCartOutPort,
    private readonly createSagaPort: CreateSagaOutPort,
  ) {}

  async execute(correlationId: string): Promise<CartEntity> {
    const sagaId = await this.createSagaPort.createSaga({ correlationId });

    const cart = new CartEntity({
      id: randomUUID(),
      orderId: randomUUID(),
      positions: [
        new CartPositionEntity({
          id: randomUUID(),
          name: 'hah1',
          code: 1001,
          sum: 1001,
        }),
        new CartPositionEntity({
          id: randomUUID(),
          name: 'hah2',
          code: 1002,
          sum: 500,
        }),
        new CartPositionEntity({
          id: randomUUID(),
          name: 'hah3',
          code: 1004,
          sum: 199,
        }),
      ],
    });

    cart.createOrder(sagaId, correlationId);

    return this.saveCartPort.saveCart(cart);
  }
}
