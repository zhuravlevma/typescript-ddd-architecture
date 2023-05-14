import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DeliverymanRepository } from './deliveryman/dal/deliveryman.repository';
import { DeliverymanOrmEntity } from './deliveryman/dal/orm-entities/deliveryman.orm-entity';
import { OrderOrmEntity } from './deliveryman/dal/orm-entities/orders.orm-entity';
import { DeliverymanController } from './deliveryman/web/deliveryman.controller';
import { AddOrderToDeliverymanInteractor } from './deliveryman/domain/interactors/add-order-to-deliveryman.interactor';
import { ChangeDeliverymansStatusInteractor } from './deliveryman/domain/interactors/change-deliverymans-status.interactor';
import { CreateDeliverymanInteractor } from './deliveryman/domain/interactors/create-deliveryman.interactor';
import { FindAllDeliverymansInteractor } from './deliveryman/domain/interactors/find-all-deliverymans.interactor';
import { UpdateDeliverymansInfoInteractor } from './deliveryman/domain/interactors/update-deliverymans-info.interactor';
import { UpdateOrderStatusInteractor } from './deliveryman/domain/interactors/update-order-status.interactor';
import { AddOrderToDeliverymanUseCase } from './deliveryman/domain/ports/in/add-order-to-deliveryman.use-case';
import { ChangeDeliverymansStatusUseCase } from './deliveryman/domain/ports/in/change-deliverymans-status.use-case';
import { CreateDeliverymanUseCase } from './deliveryman/domain/ports/in/create-deliveryman.use-case';
import { FindAllDeliverymansUseCase } from './deliveryman/domain/ports/in/find-all-deliverymans.use-case';
import { UpdateDeliverymansInfoUseCase } from './deliveryman/domain/ports/in/update-deliveryman-info.use-case';
import { UpdateDeliverymansOrdersUseCase } from './deliveryman/domain/ports/in/update-deliverymans-orders.use-case';
import { UpdateOrderStatusUseCase } from './deliveryman/domain/ports/in/update-order-status.use-case';
import { CreateDeliverymanPort } from './deliveryman/domain/ports/out/create-deliveryman.port';
import { FindAllDeliverymansPort } from './deliveryman/domain/ports/out/find-all-deliverymans.port';
import { FindDeliverymanByIdWithOrdersPort } from './deliveryman/domain/ports/out/find-deliveryman-by-id-with-orders.port';
import { SaveDeliverymanPort } from './deliveryman/domain/ports/out/save-deliveryman.port';

@Module({
  imports: [TypeOrmModule.forFeature([OrderOrmEntity, DeliverymanOrmEntity])],
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
export class DeliveryModule {}
