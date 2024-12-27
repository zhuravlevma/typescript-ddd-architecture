import { CartEntity } from '../../entities/cart.entity';

export abstract class CreateCartInPort {
  abstract execute(correlationId: string): Promise<CartEntity>;
}
