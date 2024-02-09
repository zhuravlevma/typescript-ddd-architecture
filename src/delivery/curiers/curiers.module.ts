import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CurierRepository } from './curier/dal/curier.repository';
import { CurierOrmEntity } from './curier/dal/orm-entities/curier.orm-entity';
import { OrderOrmEntity } from './curier/dal/orm-entities/orders.orm-entity';
import { CurierController } from './curier/curier.controller';
import { AddOrderToCurierInteractor } from './curier/domain/interactors/add-order-to-curier.interactor';
import { ChangeCuriersStatusInteractor } from './curier/domain/interactors/change-curiers-status.interactor';
import { CreateCurierInteractor } from './curier/domain/interactors/create-curier.interactor';
import { FindAllCuriersQuery } from './curier/domain/queries/find-all-curiers.query';
import { UpdateCuriersInfoInteractor } from './curier/domain/interactors/update-curiers-info.interactor';
import { UpdateOrderInteractor } from './curier/domain/interactors/update-order.interactor';
import { AddOrderToCurierInPort } from './curier/domain/ports/in/add-order-to-curier.in-port';
import { ChangeCuriersStatusInPort } from './curier/domain/ports/in/change-curiers-status.in-port';
import { CreateCurierInPort } from './curier/domain/ports/in/create-curier.in-port';
import { FindAllCuriersInPort } from './curier/domain/ports/in/find-all-curiers.in-port';
import { UpdateCuriersInPort } from './curier/domain/ports/in/update-curier-info.in-port';
import { UpdateOrderInPort } from './curier/domain/ports/in/update-order.in-port';
import { CreateCurierOutPort } from './curier/domain/ports/out/create-curier.out-port';
import { FindAllCuriersOutPort } from './curier/domain/ports/out/find-all-curiers.out-port';
import { FindCountOfFreeCuriersOutPort } from './curier/domain/ports/out/find-count-of-free-curiers.out-port';
import { FindCurierByIdWithOrdersOutPort } from './curier/domain/ports/out/find-curier-by-id-with-orders.out-port';
import { FindCurierOrderLadingOutPort } from './curier/domain/ports/out/find-curier-order-lading.out-port';
import { SaveCurierOutPort } from './curier/domain/ports/out/save-curier.out-port';

@Module({
  imports: [TypeOrmModule.forFeature([OrderOrmEntity, CurierOrmEntity])],
  controllers: [CurierController],
  providers: [
    {
      provide: AddOrderToCurierInPort,
      useFactory: (a, b) => new AddOrderToCurierInteractor(a, b),
      inject: [FindCurierByIdWithOrdersOutPort, SaveCurierOutPort],
    },
    {
      provide: ChangeCuriersStatusInPort,
      useFactory: (a, b) => new ChangeCuriersStatusInteractor(a, b),
      inject: [FindCurierByIdWithOrdersOutPort, SaveCurierOutPort],
    },
    {
      provide: CreateCurierInPort,
      useFactory: (a) => new CreateCurierInteractor(a),
      inject: [CreateCurierInPort],
    },
    {
      provide: FindAllCuriersInPort,
      useFactory: (t) => new FindAllCuriersQuery(t),
      inject: [FindAllCuriersOutPort],
    },
    {
      provide: UpdateCuriersInPort,
      useFactory: (a, b) => new UpdateCuriersInfoInteractor(a, b),
      inject: [FindCurierByIdWithOrdersOutPort, SaveCurierOutPort],
    },
    {
      provide: UpdateOrderInPort,
      useFactory: (a, b) => new UpdateOrderInteractor(a, b),
      inject: [FindCurierOrderLadingOutPort, SaveCurierOutPort],
    },

    {
      provide: CreateCurierInPort,
      useClass: CurierRepository,
    },
    {
      provide: FindAllCuriersOutPort,
      useClass: CurierRepository,
    },
    {
      provide: CreateCurierOutPort,
      useClass: CurierRepository,
    },
    {
      provide: FindCountOfFreeCuriersOutPort,
      useClass: CurierRepository,
    },
    {
      provide: FindCurierByIdWithOrdersOutPort,
      useClass: CurierRepository,
    },
    {
      provide: FindCurierOrderLadingOutPort,
      useClass: CurierRepository,
    },
    {
      provide: SaveCurierOutPort,
      useClass: CurierRepository,
    },
  ],
})
export class CuriersModule {}
