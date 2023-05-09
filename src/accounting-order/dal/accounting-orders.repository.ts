import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { AccountingOrderMapper } from './accounting-order.mapper';
import { OrderOrmEntity } from 'src/__typeorm/orders.orm-entity';
import { OrderEntity } from '../domain/entities/order.entity';

@Injectable()
export class AccountingOrdersRepository {
  constructor(
    @InjectRepository(OrderOrmEntity)
    private accountingOrdersRepository: Repository<OrderOrmEntity>,
  ) {}

  async findAllOrders(): Promise<OrderEntity[]> {
    const orders = await this.accountingOrdersRepository.find();
    return orders.map((order) => AccountingOrderMapper.mapToDomain(order));
  }

  async findOrderById(orderId: string): Promise<OrderEntity> {
    const order = await this.accountingOrdersRepository.findOne({
      where: {
        id: orderId,
      },
    });
    return AccountingOrderMapper.mapToDomain(order);
  }

  async save(order: OrderEntity): Promise<OrderEntity> {
    const orderOrm = AccountingOrderMapper.mapToOrm(order);
    const savedOrder = await this.accountingOrdersRepository.save(orderOrm);
    return AccountingOrderMapper.mapToDomain(savedOrder);
  }
}
