import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AccountingOrdersService } from '../../domain/accounting-order/services/accounting-orders.service';
import { UpdateOrderNestDto } from '../dtos/update-orders.dto';
import { AccountingOrderEntity } from 'src/delivery/domain/accounting-order/entities/accounting-order.entity';

@Controller('orders')
export class AccountingOrdersController {
  constructor(private readonly orderService: AccountingOrdersService) {}

  @Get('/')
  find(): Promise<AccountingOrderEntity[]> {
    return this.orderService.findAll();
  }

  @Post('/:orderId')
  updateOrderById(
    @Param('orderId') orderId: string,
    @Body() updateOrderDto: UpdateOrderNestDto,
  ): Promise<AccountingOrderEntity> {
    return this.orderService.updateOrder(orderId, updateOrderDto);
  }
}
