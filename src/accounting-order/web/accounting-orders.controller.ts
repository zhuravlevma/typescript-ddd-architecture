import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UpdateOrderNestDto } from './dtos/update-orders.dto';
import { OrderEntity } from '../domain/entities/order.entity';
import { FindAllOrdersUseCase } from '../domain/ports/in/find-all-orders.use-case';
import { UpdateOrderUseCase } from '../domain/ports/in/update-order.use-case';

@Controller('orders')
export class AccountingOrdersController {
  constructor(
    private readonly findAllOrdersService: FindAllOrdersUseCase,
    private readonly updateOrderService: UpdateOrderUseCase,
  ) {}

  @Get('/')
  find(): Promise<OrderEntity[]> {
    return this.findAllOrdersService.execute();
  }

  @Post('/:orderId')
  updateOrderById(
    @Param('orderId') orderId: string,
    @Body() updateOrderDto: UpdateOrderNestDto,
  ): Promise<OrderEntity> {
    return this.updateOrderService.execute(orderId, updateOrderDto);
  }
}
