import { CartEntity } from '../../entities/cart.entity';

export interface UpdateCartParams {
  warehouseId: string;
  orderId: string;
  isValid: boolean;
}

export abstract class UpdateCartInPort {
  abstract execute(updateCartParams: UpdateCartParams): Promise<CartEntity>;
}
