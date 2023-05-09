import { Module } from '@nestjs/common';
import { UpdateDeliverymansInfoInteractor } from './domain/interactors/update-deliverymans-info.interactor';
import { UpdateDeliverymansOrdersUseCase } from './domain/ports/in/update-deliverymans-orders.use-case';
import { UpdateDeliverymansInfoUseCase } from './domain/ports/in/update-deliveryman-info.use-case';
import { FindAllDeliverymansInteractor } from './domain/interactors/find-all-deliverymans.interactor';
import { FindAllDeliverymansUseCase } from './domain/ports/in/find-all-deliverymans.use-case';
import { CreateDeliverymanUseCase } from './domain/ports/in/create-deliveryman.use-case';
import { CreateDeliverymanInteractor } from './domain/interactors/create-deliveryman.interactor';
import { ChangeDeliverymansStatusInteractor } from './domain/interactors/change-deliverymans-status.interactor';
import { ChangeDeliverymansStatusUseCase } from './domain/ports/in/change-deliverymans-status.use-case';
import { AddOrderToDeliverymanInteractor } from './domain/interactors/add-order-to-deliveryman.interactor';
import { AddOrderToDeliverymanUseCase } from './domain/ports/in/add-order-to-deliveryman.use-case';
import { UpdateOrderStatusUseCase } from './domain/ports/in/update-order-status.use-case';
import { UpdateOrderStatusInteractor } from './domain/interactors/update-order-status.interactor';
import { DeliverymanRepository } from './dal/deliveryman.repository';
import { CreateDeliverymanPort } from './domain/ports/out/create-deliveryman.port';
import { FindAllDeliverymansPort } from './domain/ports/out/find-all-deliverymans.port';
import { FindDeliverymanByIdWithOrdersPort } from './domain/ports/out/find-deliveryman-by-id-with-orders.port';
import { SaveDeliverymanPort } from './domain/ports/out/save-deliveryman.port';
import { DeliverymanController } from './web/deliveryman.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BillOfLadingPositionOrmEntity } from 'src/__typeorm__/bill-of-lading-position.orm-entity';
import { DeliverymanOrmEntity } from 'src/__typeorm__/deliveryman.orm-entity';
import { OrderOrmEntity } from 'src/__typeorm__/orders.orm-entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      OrderOrmEntity,
      DeliverymanOrmEntity,
      BillOfLadingPositionOrmEntity,
    ]),
  ],
  controllers: [DeliverymanController],
  providers: [
    {
      provide: AddOrderToDeliverymanUseCase,
      useClass: AddOrderToDeliverymanInteractor,
    },
    {
      provide: ChangeDeliverymansStatusUseCase,
      useClass: ChangeDeliverymansStatusInteractor,
    },
    {
      provide: CreateDeliverymanUseCase,
      useClass: CreateDeliverymanInteractor,
    },
    {
      provide: FindAllDeliverymansUseCase,
      useClass: FindAllDeliverymansInteractor,
    },
    {
      provide: UpdateDeliverymansInfoUseCase,
      useClass: UpdateDeliverymansInfoInteractor,
    },
    {
      provide: UpdateDeliverymansOrdersUseCase,
      useClass: UpdateDeliverymansInfoInteractor,
    },
    {
      provide: UpdateOrderStatusUseCase,
      useClass: UpdateOrderStatusInteractor,
    },

    {
      provide: CreateDeliverymanPort,
      useClass: DeliverymanRepository,
    },
    {
      provide: FindAllDeliverymansPort,
      useClass: DeliverymanRepository,
    },
    {
      provide: FindDeliverymanByIdWithOrdersPort,
      useClass: DeliverymanRepository,
    },
    {
      provide: SaveDeliverymanPort,
      useClass: DeliverymanRepository,
    },
  ],
})
export class DeliverymanModule {}
