import { CartEntity } from '../entities/cart.entity';
import { SaveCartOutPort } from '../ports/out/save-cart.out-port';
import {
  UpdateCartInPort,
  UpdateCartParams,
} from '../ports/in/update-cart.in-port';
import { GetCartOutPort } from '../ports/out/get-cart.out-port';

export class UpdateCartInteractor implements UpdateCartInPort {
  constructor(
    private readonly saveCartPort: SaveCartOutPort,

    private readonly getCartOutPort: GetCartOutPort,
  ) {}

  async execute(updateCartParams: UpdateCartParams): Promise<CartEntity> {
    const cart = await this.getCartOutPort.getCart(updateCartParams.cartId);

    cart.cancelOrder();

    return this.saveCartPort.saveCart(cart);
  }
}
