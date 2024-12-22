import { CartEntity } from '../../entities/cart.entity';

export abstract class SaveCartOutPort {
  abstract saveCart(cart: CartEntity): Promise<CartEntity>;
}
