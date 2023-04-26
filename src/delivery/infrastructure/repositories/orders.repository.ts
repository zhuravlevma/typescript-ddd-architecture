import { Repository } from 'typeorm';
import { OrderOrmEntity } from '../orm-entities/orders.orm-entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { AccountingOrderEntity } from 'src/delivery/domain/entities/accounting-order.entity';
import { AccountingOrderMapper } from '../mappers/accounting-order.mapper';

@Injectable()
export class OrdersRepository {
  constructor(
    @InjectRepository(OrderOrmEntity)
    private ordersRepository: Repository<OrderOrmEntity>,
  ) {}

  async findAllOrders(): Promise<AccountingOrderEntity[]> {
    const orders = await this.ordersRepository.find();
    return orders.map((order) => AccountingOrderMapper.mapToDomain(order));
  }

  async findOrderByIdWithDeliveryman(
    orderId: string,
  ): Promise<AccountingOrderEntity> {
    const order = await this.ordersRepository.findOne({
      where: {
        id: orderId,
      },
      relations: {
        deliveryman: true,
      },
    });
    return AccountingOrderMapper.mapToDomain(order);
  }

  async save(order: AccountingOrderEntity): Promise<AccountingOrderEntity> {
    const orderOrm = AccountingOrderMapper.mapToOrm(order);
    const savedOrder = await this.ordersRepository.save(orderOrm);
    return AccountingOrderMapper.mapToDomain(savedOrder);
  }
}
