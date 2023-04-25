import { Repository } from 'typeorm';
import { Order } from '../orm-entities/orders.model';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';

@Injectable()
export class OrdersRepository {
  constructor(
    @InjectRepository(Order)
    private ordersRepository: Repository<Order>,
  ) {}

  findAllOrders(): Promise<Order[]> {
    return this.ordersRepository.find();
  }

  findOrderByIdWithDeliveryman(orderId: number): Promise<Order> {
    return this.ordersRepository.findOne({
      where: {
        id: orderId,
      },
      relations: {
        deliveryman: true,
      },
    });
  }

  async save(order: Order) {
    return this.ordersRepository.save(order);
  }
}
