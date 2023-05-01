import { Module } from '@nestjs/common';
import { UpdateOrderService } from './services/update-order.service';
import { UpdateOrderUseCase } from './ports/in/update-order.use-case';
import { FindOrderByIdService } from './services/find-order-by-id.service';
import { FindOrderByIdUseCase } from './ports/in/find-order-by-id.use-case';
import { FindAllOrdersService } from './services/find-all-orders.service';
import { FindAllOrdersUseCase } from './ports/in/find-all-orders.use-case';

@Module({
  imports: [],
  controllers: [],
  providers: [
    {
      provide: FindAllOrdersUseCase,
      useClass: FindAllOrdersService,
    },
    {
      provide: FindOrderByIdUseCase,
      useClass: FindOrderByIdService,
    },
    {
      provide: UpdateOrderUseCase,
      useClass: UpdateOrderService,
    },
  ],
  exports: [FindAllOrdersUseCase, FindOrderByIdUseCase, UpdateOrderUseCase],
})
export class AccountingOrderModule {}
