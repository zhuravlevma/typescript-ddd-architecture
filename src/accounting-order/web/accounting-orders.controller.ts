import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UpdateOrderNestDto } from './dtos/update-orders.dto';
import { AccountingOrderEntity } from '../domain/entities/accounting-order.entity';
import { FindAllOrdersUseCase } from '../domain/ports/in/find-all-orders.use-case';
import { UpdateOrderUseCase } from '../domain/ports/in/update-order.use-case';

@Controller('orders')
export class AccountingOrdersController {
  constructor(
    private readonly findAllOrdersService: FindAllOrdersUseCase,
    private readonly updateOrderService: UpdateOrderUseCase,
  ) {}

  @Get('/')
  find(): Promise<AccountingOrderEntity[]> {
    return this.findAllOrdersService.findAll();
  }

  @Post('/:orderId')
  updateOrderById(
    @Param('orderId') orderId: string,
    @Body() updateOrderDto: UpdateOrderNestDto,
  ): Promise<AccountingOrderEntity> {
    return this.updateOrderService.updateOrder(orderId, updateOrderDto);
  }
}
