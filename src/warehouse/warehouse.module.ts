import { TypeOrmModule } from '@nestjs/typeorm';
import { UpdateOrderStatusInteractor } from './warehouse/domain/interactors/update-order-status.interactor';
import { UpdateOrderStatusUseCase } from './warehouse/domain/ports/in/update-order-status.use-case';
import { Module } from '@nestjs/common';
import { SaveWarehousePort } from './warehouse/domain/ports/out/save-warehouse.port';
import { AddOrderUseCase } from './warehouse/domain/ports/in/add-order.use-case';
import { AddOrderInteractor } from './warehouse/domain/interactors/add-order.interactor';
import { CreateWarehouseUseCase } from './warehouse/domain/ports/in/create-warehouse.use-case';
import { CreateWarehouseInteractor } from './warehouse/domain/interactors/create-warehouse.interactor';
import { GetWarehouseWithOrdersPort } from './warehouse/domain/ports/out/get-warehouse-with-orders.port';
import { GetWarehouseWithOrderPort } from './warehouse/domain/ports/out/get-warehouse-with-order.port';
import { OrderOrmEntity } from './warehouse/dal/orm-entities/order.orm-entity';
import { WarehouseController } from './warehouse/warehouse.controller';
import { WarehouseOrmEntity } from './warehouse/dal/orm-entities/warehouse.orm-entity';
import { WarehouseRepository } from './warehouse/dal/warehouse.repository';

@Module({
  imports: [TypeOrmModule.forFeature([WarehouseOrmEntity, OrderOrmEntity])],
  controllers: [WarehouseController],
  providers: [
    WarehouseRepository,
    {
      provide: UpdateOrderStatusUseCase,
      useFactory: (a, b) => new UpdateOrderStatusInteractor(a, b),
      inject: [SaveWarehousePort, GetWarehouseWithOrderPort],
    },
    {
      provide: CreateWarehouseUseCase,
      useFactory: (a) => new CreateWarehouseInteractor(a),
      inject: [SaveWarehousePort],
    },
    {
      provide: AddOrderUseCase,
      useFactory: (a, b) => new AddOrderInteractor(a, b),
      inject: [GetWarehouseWithOrdersPort, SaveWarehousePort],
    },
    {
      provide: GetWarehouseWithOrdersPort,
      useClass: WarehouseRepository,
    },
    {
      provide: GetWarehouseWithOrderPort,
      useClass: WarehouseRepository,
    },
    {
      provide: SaveWarehousePort,
      useClass: WarehouseRepository,
    },
  ],
})
export class WarehouseModule {}
