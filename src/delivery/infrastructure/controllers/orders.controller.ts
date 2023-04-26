import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { Order } from '../orm-entities/orders.model';
import { OrdersService } from '../services/orders.service';
import { UpdateOrderNestDto } from '../dtos/update-order.dto';

@Controller('orders')
export class OrdersController {
  constructor(private readonly orderService: OrdersService) {}

  @Get('/')
  find(): Promise<Order[]> {
    return this.orderService.findAll();
  }

  @Post('/:orderId')
  updateOrderById(
    @Param('orderId') orderId: string,
    @Body() updateOrderDto: UpdateOrderNestDto,
  ): Promise<Order> {
    return this.orderService.updateOrder(+orderId, updateOrderDto);
  }
}
