import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartOrmEntity } from './dal/orm-entities/cart.orm-entity';
import { CartPositionOrmEntity } from './dal/orm-entities/cart-position.orm-entity';
import { CartController } from './controllers/cart.controller';
import { CartRepository } from './dal/cart.repository';
import { CreateCartInPort } from './domain/ports/in/create-cart.in-port';
import { CreateCartInteractor } from './domain/interactors/create-cart.interactor';
import { SaveCartOutPort } from './domain/ports/out/save-cart.out-port';
import { GetCartOutPort } from './domain/ports/out/get-cart.out-port';
import { SagaModule } from 'src/__saga__/saga.module';
import { CreateSagaOutPort } from './domain/ports/out/create-saga.out-port';
import { ExternalSagaApi } from './api/external-saga-api';

@Module({
  imports: [
    TypeOrmModule.forFeature([CartOrmEntity, CartPositionOrmEntity]),
    SagaModule,
  ],
  controllers: [CartController],
  providers: [
    CartRepository,
    {
      provide: CreateCartInPort,
      useFactory: (a, b) => new CreateCartInteractor(a, b),
      inject: [SaveCartOutPort],
    },
    {
      provide: GetCartOutPort,
      useClass: CartRepository,
    },
    {
      provide: SaveCartOutPort,
      useClass: CartRepository,
    },
    {
      provide: CreateSagaOutPort,
      useClass: ExternalSagaApi,
    },
  ],
})
export class CartModule {}
