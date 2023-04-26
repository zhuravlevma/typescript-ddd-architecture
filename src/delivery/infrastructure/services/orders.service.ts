import { Injectable } from '@nestjs/common';
import { OrdersRepository } from '../repositories/orders.repository';
import { UpdateOrderNestDto } from '../dtos/update-order.dto';
import { AccountingOrderEntity } from 'src/delivery/domain/entities/accounting-order.entity';

@Injectable()
export class OrdersService {
  constructor(private ordersRepository: OrdersRepository) {}

  findAll(): Promise<AccountingOrderEntity[]> {
    return this.ordersRepository.findAllOrders();
  }

  findOne(id: string): Promise<AccountingOrderEntity | null> {
    return this.ordersRepository.findOrderByIdWithDeliveryman(id);
  }

  async updateOrder(
    orderId: string,
    updateOrderDto: UpdateOrderNestDto,
  ): Promise<AccountingOrderEntity> {
    const order = await this.ordersRepository.findOrderByIdWithDeliveryman(
      orderId,
    );

    updateOrderDto.isActive !== undefined ??
      order.changeStatus(updateOrderDto.isActive);

    updateOrderDto.description !== undefined ??
      order.addInfoToDescription(updateOrderDto.description);

    return this.ordersRepository.save(order);
  }
}
