import { Module } from '@nestjs/common';
import { UpdateDeliverymansInfoService } from './domain/services/update-deliverymans-info.service';
import { UpdateDeliverymansOrdersUseCase } from './domain/ports/in/update-deliverymans-orders.dto';
import { UpdateDeliverymansInfoUseCase } from './domain/ports/in/update-deliveryman-info.use-case';
import { FindAllDeliverymansService } from './domain/services/find-all-deliverymans.service';
import { FindAllDeliverymansUseCase } from './domain/ports/in/find-all-deliverymans.use-case';
import { CreateDeliverymanUseCase } from './domain/ports/in/create-deliveryman.use-case';
import { CreateDeliverymanService } from './domain/services/create-deliveryman.service';
import { ChangeDeliverymansStatusService } from './domain/services/change-deliverymans-status.service';
import { ChangeDeliverymansStatusUseCase } from './domain/ports/in/change-deliverymans-status.use-case';
import { AddOrderToDeliverymanService } from './domain/services/add-order-to-deliveryman.service';
import { AddOrderToDeliverymanUseCase } from './domain/ports/in/add-order-to-deliveryman.use-case';
import { UpdateOrderStatusUseCase } from './domain/ports/in/update-order-status.use-case';
import { UpdateOrderStatusService } from './domain/services/update-order-status.service';
import { DeliverymanRepository } from './dal/deliveryman.repository';
import { CreateDeliverymanPort } from './domain/ports/out/create-deliveryman.port';
import { FindAllDeliverymansPort } from './domain/ports/out/find-all-deliverymans.port';
import { FindDeliverymanByIdWithOrdersPort } from './domain/ports/out/find-deliveryman-by-id-with-orders.port';
import { SaveDeliverymanPort } from './domain/ports/out/save-deliveryman.port';
import { DeliverymanController } from './web/deliveryman.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BillOfLadingPositionOrmEntity } from 'src/__typeorm/bill-of-lading-position.orm-entity';
import { DeliverymanOrmEntity } from 'src/__typeorm/deliveryman.orm-entity';
import { OrderOrmEntity } from 'src/__typeorm/orders.orm-entity';

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
      useClass: AddOrderToDeliverymanService,
    },
    {
      provide: ChangeDeliverymansStatusUseCase,
      useClass: ChangeDeliverymansStatusService,
    },
    {
      provide: CreateDeliverymanUseCase,
      useClass: CreateDeliverymanService,
    },
    {
      provide: FindAllDeliverymansUseCase,
      useClass: FindAllDeliverymansService,
    },
    {
      provide: UpdateDeliverymansInfoUseCase,
      useClass: UpdateDeliverymansInfoService,
    },
    {
      provide: UpdateDeliverymansOrdersUseCase,
      useClass: UpdateDeliverymansInfoService,
    },
    {
      provide: UpdateOrderStatusUseCase,
      useClass: UpdateOrderStatusService,
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
