import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OfferController } from './offer/offer.controller';
import { OfferRepository } from './offer/dal/offer.repository';
import { CreateOfferInteractor } from './offer/domain/interactors/create-offer.interactor';
import { UpdateOfferInteractor } from './offer/domain/interactors/update-offer.interactor';
import { CreateOfferInPort } from './offer/domain/ports/in/create-offer.in-port';
import { UpdateOfferInPort } from './offer/domain/ports/in/update-offer.in-port';
import { FindOfferByIdOutPort } from './offer/domain/ports/out/find-offer-by-id.out-port';
import { FindOfferByOrderIdOutPort } from './offer/domain/ports/out/find-offer-by-order-id.out-port';
import { SaveOfferOutPort } from './offer/domain/ports/out/save-offer.out-port';
import { OfferOrmEntity } from './offer/dal/orm-entities/offer.orm-entity';

@Module({
  imports: [TypeOrmModule.forFeature([OfferOrmEntity])],
  controllers: [OfferController],
  providers: [
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
      provide: UpdateOfferInPort,
      useFactory: (a, b) => new UpdateOfferInteractor(a, b),
      inject: [FindOfferByIdOutPort, SaveOfferOutPort],
    },
    {
      provide: CreateOfferInPort,
      useFactory: (a) => new CreateOfferInteractor(a),
      inject: [SaveOfferOutPort],
    },
  ],
})
export class BoardModule {}
