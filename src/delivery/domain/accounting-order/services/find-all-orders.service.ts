import { Injectable } from '@nestjs/common';
import { AccountingOrderEntity } from 'src/delivery/domain/accounting-order/entities/accounting-order.entity';
import { FindAllOrdersUseCase } from '../ports/in/find-all-orders.use-case';
import { FindAllOrdersPort } from '../ports/out/find-all-orders.port';

@Injectable()
export class FindAllOrdersService implements FindAllOrdersUseCase {
  constructor(private findAllOrdersPort: FindAllOrdersPort) {}

  findAll(): Promise<AccountingOrderEntity[]> {
    return this.findAllOrdersPort.findAllOrders();
  }
}
