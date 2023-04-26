import { Injectable } from '@nestjs/common';
import { AccountingOrdersRepository } from '../../../infrastructure/repositories/accounting-orders.repository';
import { UpdateOrderNestDto } from '../../../infrastructure/dtos/update-orders.dto';
import { AccountingOrderEntity } from 'src/delivery/domain/accounting-order/entities/accounting-order.entity';

@Injectable()
export class AccountingOrdersService {
  constructor(private ordersRepository: AccountingOrdersRepository) {}

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
