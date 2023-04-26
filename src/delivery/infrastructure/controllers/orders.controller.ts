import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { OrderOrmEntity } from '../orm-entities/orders.orm-entity';
import { OrdersService } from '../services/orders.service';
import { UpdateOrderNestDto } from '../dtos/update-order.dto';

@Controller('orders')
export class OrdersController {
  constructor(private readonly orderService: OrdersService) {}

  @Get('/')
  find(): Promise<OrderOrmEntity[]> {
    return this.orderService.findAll();
  }

  @Post('/:orderId')
  updateOrderById(
    @Param('orderId') orderId: string,
    @Body() updateOrderDto: UpdateOrderNestDto,
  ): Promise<OrderOrmEntity> {
    return this.orderService.updateOrder(+orderId, updateOrderDto);
  }
}
