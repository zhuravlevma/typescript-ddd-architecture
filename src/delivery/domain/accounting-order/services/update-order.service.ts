import { Injectable } from '@nestjs/common';
import { UpdateOrderNestDto } from '../../../infrastructure/dtos/update-orders.dto';
import { AccountingOrderEntity } from 'src/delivery/domain/accounting-order/entities/accounting-order.entity';
import { UpdateOrderUseCase } from '../ports/in/update-order.use-case';
import { FindOrderByIdPort } from '../ports/out/find-order-by-id.port';
import { SaveOrderPort } from '../ports/out/save-order.port';

@Injectable()
export class UpdateOrderService implements UpdateOrderUseCase {
  constructor(
    private readonly findOrderByIdPort: FindOrderByIdPort,
    private readonly saveOrderPort: SaveOrderPort,
  ) {}

  async updateOrder(
    orderId: string,
    updateOrderDto: UpdateOrderNestDto,
  ): Promise<AccountingOrderEntity> {
    const order = await this.findOrderByIdPort.findOrderById(orderId);

    updateOrderDto.description !== undefined ??
      order.addInfoToDescription(updateOrderDto.description);

    return this.saveOrderPort.save(order);
  }
}
