import { Module } from '@nestjs/common';
import { UpdateOrderService } from './domain/interactors/update-order.interactor';
import { UpdateOrderUseCase } from './domain/ports/in/update-order.use-case';
import { FindOrderByIdInteractor } from './domain/interactors/find-order-by-id.interactor';
import { FindOrderByIdUseCase } from './domain/ports/in/find-order-by-id.use-case';
import { FindAllOrdersInteractor } from './domain/interactors/find-all-orders.interactor';
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
      useClass: FindAllOrdersInteractor,
    },
    {
      provide: FindOrderByIdUseCase,
      useClass: FindOrderByIdInteractor,
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
