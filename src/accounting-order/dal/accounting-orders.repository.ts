import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { AccountingOrderMapper } from './accounting-order.mapper';
import { OrderOrmEntity } from 'src/__typeorm/orders.orm-entity';
import { AccountingOrderEntity } from '../domain/entities/accounting-order.entity';

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
