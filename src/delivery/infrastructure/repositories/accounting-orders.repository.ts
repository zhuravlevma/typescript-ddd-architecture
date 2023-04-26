import { Repository } from 'typeorm';
import { OrderOrmEntity } from '../orm-entities/orders.orm-entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { AccountingOrderEntity } from 'src/delivery/domain/accounting-order/entities/accounting-order.entity';
import { AccountingOrderMapper } from '../mappers/accounting-order.mapper';

@Injectable()
export class AccountingOrdersRepository {
  constructor(
    @InjectRepository(OrderOrmEntity)
    private accountingOrdersRepository: Repository<OrderOrmEntity>,
  ) {}

  async findAllOrders(): Promise<AccountingOrderEntity[]> {
    const orders = await this.accountingOrdersRepository.find();
    return orders.map((order) => AccountingOrderMapper.mapToDomain(order));
  }

  async findOrderById(orderId: string): Promise<AccountingOrderEntity> {
    const order = await this.accountingOrdersRepository.findOne({
      where: {
        id: orderId,
      },
    });
    return AccountingOrderMapper.mapToDomain(order);
  }

  async save(order: AccountingOrderEntity): Promise<AccountingOrderEntity> {
    const orderOrm = AccountingOrderMapper.mapToOrm(order);
    const savedOrder = await this.accountingOrdersRepository.save(orderOrm);
    return AccountingOrderMapper.mapToDomain(savedOrder);
  }
}
