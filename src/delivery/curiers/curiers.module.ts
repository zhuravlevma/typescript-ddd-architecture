import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DeliverymanRepository } from './curier/dal/deliveryman.repository';
import { DeliverymanOrmEntity } from './curier/dal/orm-entities/deliveryman.orm-entity';
import { OrderOrmEntity } from './curier/dal/orm-entities/orders.orm-entity';
import { DeliverymanController } from './curier/deliveryman.controller';
import { AddOrderToDeliverymanInteractor } from './curier/domain/interactors/add-order-to-deliveryman.interactor';
import { ChangeDeliverymansStatusInteractor } from './curier/domain/interactors/change-deliverymans-status.interactor';
import { CreateDeliverymanInteractor } from './curier/domain/interactors/create-deliveryman.interactor';
import { FindAllDeliverymansInteractor } from './curier/domain/interactors/find-all-deliverymans.interactor';
import { UpdateDeliverymansInfoInteractor } from './curier/domain/interactors/update-deliverymans-info.interactor';
import { UpdateOrderInteractor } from './curier/domain/interactors/update-order.interactor';
import { AddOrderToDeliverymanInPort } from './curier/domain/ports/in/add-order-to-deliveryman.in-port';
import { ChangeDeliverymansStatusInPort } from './curier/domain/ports/in/change-deliverymans-status.in-port';
import { CreateDeliverymanInPort } from './curier/domain/ports/in/create-deliveryman.in-port';
import { FindAllDeliverymansInPort } from './curier/domain/ports/in/find-all-deliverymans.in-port';
import { UpdateDeliverymansInPort } from './curier/domain/ports/in/update-deliveryman-info.in-port';
import { UpdateOrderInPort } from './curier/domain/ports/in/update-order.in-port';
import { CreateDeliverymanOutPort } from './curier/domain/ports/out/create-deliveryman.out-port';
import { FindAllDeliverymansOutPort } from './curier/domain/ports/out/find-all-deliverymans.out-port';
import { FindCountOfFreeDeliverymansOutPort } from './curier/domain/ports/out/find-count-of-free-deliverymans.out-port';
import { FindDeliverymanByIdWithOrdersOutPort } from './curier/domain/ports/out/find-deliveryman-by-id-with-orders.out-port';
import { FindDeliverymanOrderLadingOutPort } from './curier/domain/ports/out/find-deliveryman-order-lading.out-port';
import { SaveDeliverymanOutPort } from './curier/domain/ports/out/save-deliveryman.out-port';

@Module({
  imports: [TypeOrmModule.forFeature([OrderOrmEntity, DeliverymanOrmEntity])],
  controllers: [DeliverymanController],
  providers: [
    {
      provide: AddOrderToDeliverymanInPort,
      useFactory: (a, b) => new AddOrderToDeliverymanInteractor(a, b),
      inject: [FindDeliverymanByIdWithOrdersOutPort, SaveDeliverymanOutPort],
    },
    {
      provide: ChangeDeliverymansStatusInPort,
      useFactory: (a, b) => new ChangeDeliverymansStatusInteractor(a, b),
      inject: [FindDeliverymanByIdWithOrdersOutPort, SaveDeliverymanOutPort],
    },
    {
      provide: CreateDeliverymanInPort,
      useFactory: (a) => new CreateDeliverymanInteractor(a),
      inject: [CreateDeliverymanInPort],
    },
    {
      provide: FindAllDeliverymansInPort,
      useFactory: (t) => new FindAllDeliverymansInteractor(t),
      inject: [FindAllDeliverymansOutPort],
    },
    {
      provide: UpdateDeliverymansInPort,
      useFactory: (a, b) => new UpdateDeliverymansInfoInteractor(a, b),
      inject: [FindDeliverymanByIdWithOrdersOutPort, SaveDeliverymanOutPort],
    },
    {
      provide: UpdateOrderInPort,
      useFactory: (a, b) => new UpdateOrderInteractor(a, b),
      inject: [FindDeliverymanOrderLadingOutPort, SaveDeliverymanOutPort],
    },

    {
      provide: CreateDeliverymanInPort,
      useClass: DeliverymanRepository,
    },
    {
      provide: FindAllDeliverymansOutPort,
      useClass: DeliverymanRepository,
    },
    {
      provide: CreateDeliverymanOutPort,
      useClass: DeliverymanRepository,
    },
    {
      provide: FindCountOfFreeDeliverymansOutPort,
      useClass: DeliverymanRepository,
    },
    {
      provide: FindDeliverymanByIdWithOrdersOutPort,
      useClass: DeliverymanRepository,
    },
    {
      provide: FindDeliverymanOrderLadingOutPort,
      useClass: DeliverymanRepository,
    },
    {
      provide: SaveDeliverymanOutPort,
      useClass: DeliverymanRepository,
    },
  ],
})
export class CuriersModule {}
