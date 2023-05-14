import { TypeOrmModule } from '@nestjs/typeorm';
import { WarehouseOrmEntity } from './dal/orm-entities/warehouse.orm-entity';
import { UpdateOrderStatusInteractor } from './domain/interactors/update-order-status.interactor';
import { UpdateOrderStatusUseCase } from './domain/ports/in/update-order-status.use-case';
import { Module } from '@nestjs/common';
import { UpdateOrderPort } from './domain/ports/out/update-order.port';
import { WarehouseRepository } from './dal/warehouse.repository';

@Module({
  imports: [TypeOrmModule.forFeature([WarehouseOrmEntity])],
  controllers: [],
  providers: [
    {
      provide: UpdateOrderStatusUseCase,
      useClass: UpdateOrderStatusInteractor,
    },
    {
      provide: UpdateOrderPort,
      useClass: WarehouseRepository,
    },
  ],
})
export class WarehouseModule {}
