import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DeliverymanRepository } from './deliveryman/dal/deliveryman.repository';
import { DeliverymanOrmEntity } from './deliveryman/dal/orm-entities/deliveryman.orm-entity';
import { OrderOrmEntity } from './deliveryman/dal/orm-entities/orders.orm-entity';
import { DeliverymanController } from './deliveryman/deliveryman.controller';
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
import { OfferOrmEntity } from './offer/dal/orm-entities/offer.orm-entity';
import { SaveOfferPort } from './offer/domain/ports/out/save-offer.port';
import { OfferRepository } from './offer/dal/offer.repository';
import { FindOfferByIdPort } from './offer/domain/ports/out/find-offer-by-id.port';
import { FindOfferByOrderIdPort } from './offer/domain/ports/out/find-offer-by-order-id.port';
import { UpdateOfferUseCase } from './offer/domain/ports/in/update-offer.interactor';
import { UpdateOfferInteractor } from './offer/domain/interactors/update-offer.interactor';
import { CreateOfferInteractor } from './offer/domain/interactors/create-offer.interactor';
import { CreateOfferUseCase } from './offer/domain/ports/in/create-offer.use-case';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      OrderOrmEntity,
      DeliverymanOrmEntity,
      OfferOrmEntity,
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
      useFactory: (t) => new FindAllDeliverymansInteractor(t),
      inject: [FindAllDeliverymansPort],
    },
    {
      provide: UpdateDeliverymansInfoUseCase,
      useFactory: (a, b) => new UpdateDeliverymansInfoInteractor(a, b),
      inject: [FindDeliverymanByIdWithOrdersPort, SaveDeliverymanPort],
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
    {
      provide: SaveOfferPort,
      useClass: OfferRepository,
    },
    {
      provide: FindOfferByIdPort,
      useClass: OfferRepository,
    },
    {
      provide: FindOfferByOrderIdPort,
      useClass: OfferRepository,
    },
    {
      provide: UpdateOfferUseCase,
      useFactory: (a, b) => new UpdateOfferInteractor(a, b),
      inject: [FindOfferByIdPort, SaveOfferPort],
    },
    {
      provide: CreateOfferUseCase,
      useFactory: (a) => new CreateOfferInteractor(a),
      inject: [SaveOfferPort],
    },
  ],
})
export class DeliveryModule {}
