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
import { AddOrderToDeliverymanInPort } from './deliveryman/domain/ports/in/add-order-to-deliveryman.in-port';
import { ChangeDeliverymansStatusInPort } from './deliveryman/domain/ports/in/change-deliverymans-status.in-port';
import { CreateDeliverymanInPort } from './deliveryman/domain/ports/in/create-deliveryman.in-port';
import { FindAllDeliverymansInPort } from './deliveryman/domain/ports/in/find-all-deliverymans.in-port';
import { UpdateDeliverymansInPort } from './deliveryman/domain/ports/in/update-deliveryman-info.in-port';
import { UpdateOrderInPort } from './deliveryman/domain/ports/in/update-order.in-port';
import { FindAllDeliverymansOutPort } from './deliveryman/domain/ports/out/find-all-deliverymans.out-port';
import { FindDeliverymanByIdWithOrdersOutPort } from './deliveryman/domain/ports/out/find-deliveryman-by-id-with-orders.out-port';
import { SaveDeliverymanOutPort } from './deliveryman/domain/ports/out/save-deliveryman.out-port';
import { OfferOrmEntity } from './offer/dal/orm-entities/offer.orm-entity';
import { SaveOfferOutPort } from './offer/domain/ports/out/save-offer.out-port';
import { OfferRepository } from './offer/dal/offer.repository';
import { FindOfferByIdOutPort } from './offer/domain/ports/out/find-offer-by-id.out-port';
import { FindOfferByOrderIdOutPort } from './offer/domain/ports/out/find-offer-by-order-id.out-port';
import { UpdateOfferInPort } from './offer/domain/ports/in/update-offer.in-port';
import { UpdateOfferInteractor } from './offer/domain/interactors/update-offer.interactor';
import { CreateOfferInteractor } from './offer/domain/interactors/create-offer.interactor';
import { CreateOfferInPort } from './offer/domain/ports/in/create-offer.in-port';
import { FindDeliverymanOrderLadingOutPort } from './deliveryman/domain/ports/out/find-deliveryman-order-lading.out-port';
import { OfferController } from './offer/offer.controller';
import { UpdateOrderInteractor } from './deliveryman/domain/interactors/update-order.interactor';
import { FindCountOfFreeOffersOutPort } from './offer/domain/ports/out/find-count-of-free-offers.out-port';
import { FindCountOfFreeDeliverymansOutPort } from './deliveryman/domain/ports/out/find-count-of-free-deliverymans.out-port';
import { GeneralController } from './general/general.controller';
import { GetShareOffersToFreeDeliverymansInteractor } from './general/domain/interactors/get-share-offers-to-free-deliverymans.interactor';
import { GetShareOffersToFreeDeliverymansInPort } from './general/domain/ports/in/get-share-offers-to-free-deliverymans.in-port';
import { CreateDeliverymanOutPort } from './deliveryman/domain/ports/out/create-deliveryman.out-port';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      OrderOrmEntity,
      DeliverymanOrmEntity,
      OfferOrmEntity,
    ]),
  ],
  controllers: [DeliverymanController, OfferController, GeneralController],
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
    {
      provide: SaveOfferOutPort,
      useClass: OfferRepository,
    },
    {
      provide: FindOfferByIdOutPort,
      useClass: OfferRepository,
    },
    {
      provide: FindOfferByOrderIdOutPort,
      useClass: OfferRepository,
    },
    {
      provide: FindCountOfFreeOffersOutPort,
      useClass: OfferRepository,
    },
    {
      provide: UpdateOfferInPort,
      useFactory: (a, b) => new UpdateOfferInteractor(a, b),
      inject: [FindOfferByIdOutPort, SaveOfferOutPort],
    },
    {
      provide: CreateOfferInPort,
      useFactory: (a) => new CreateOfferInteractor(a),
      inject: [SaveOfferOutPort],
    },
    {
      provide: GetShareOffersToFreeDeliverymansInPort,
      useFactory: (a, b) =>
        new GetShareOffersToFreeDeliverymansInteractor(a, b),
      inject: [
        FindCountOfFreeOffersOutPort,
        FindCountOfFreeDeliverymansOutPort,
      ],
    },
  ],
})
export class DeliveryModule {}
