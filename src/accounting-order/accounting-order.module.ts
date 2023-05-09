import { Module } from '@nestjs/common';
import { UpdateOrderService } from './domain/services/update-order.service';
import { UpdateOrderUseCase } from './domain/ports/in/update-order.use-case';
import { FindOrderByIdService } from './domain/services/find-order-by-id.service';
import { FindOrderByIdUseCase } from './domain/ports/in/find-order-by-id.use-case';
import { FindAllOrdersService } from './domain/services/find-all-orders.service';
import { FindAllOrdersUseCase } from './domain/ports/in/find-all-orders.use-case';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderOrmEntity } from 'src/__typeorm/orders.orm-entity';
import { BillOfLadingPositionOrmEntity } from 'src/__typeorm/bill-of-lading-position.orm-entity';
import { AccountingOrdersController } from './web/accounting-orders.controller';
import { AccountingOrdersRepository } from './dal/accounting-orders.repository';
import { FindAllOrdersPort } from './domain/ports/out/find-all-orders.port';
import { FindOrderByIdPort } from './domain/ports/out/find-order-by-id.port';
import { SaveOrderPort } from './domain/ports/out/save-order.port';

@Module({
  imports: [
    TypeOrmModule.forFeature([OrderOrmEntity, BillOfLadingPositionOrmEntity]),
  ],
  controllers: [AccountingOrdersController],
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

    {
      provide: FindAllOrdersPort,
      useClass: AccountingOrdersRepository,
    },
    {
      provide: FindOrderByIdPort,
      useClass: AccountingOrdersRepository,
    },
    {
      provide: SaveOrderPort,
      useClass: AccountingOrdersRepository,
    },
  ],
})
export class AccountingOrderModule {}
