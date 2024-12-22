import { CartEntity } from '../../entities/cart.entity';

export abstract class GetCartOutPort {
  abstract getCart(cartId: string): Promise<CartEntity>;
}
