import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderOrmEntity } from './orm-entities/orders.orm-entity';
import { AccountingOrdersController } from './controllers/accounting-orders.controller';
import { AccountingOrdersRepository } from './repositories/accounting-orders.repository';
import { DeliverymanController } from './controllers/deliveryman.controller';
import { DeliverymanRepository } from './repositories/deliveryman.repository';
import { DeliverymanOrmEntity } from './orm-entities/deliveryman.orm-entity';
import { CreateDeliverymanService } from '../domain/deliveryman/services/create-deliveryman.service';
import { AddOrderToDeliverymanUseCase } from '../domain/deliveryman/ports/in/add-order-to-deliveryman.use-case';
import { AddOrderToDeliverymanService } from '../domain/deliveryman/services/add-order-to-deliveryman.service';
import { ChangeDeliverymansStatusUseCase } from '../domain/deliveryman/ports/in/change-deliverymans-status.use-case';
import { ChangeDeliverymansStatusService } from '../domain/deliveryman/services/change-deliverymans-status.service';
import { CreateDeliverymanUseCase } from '../domain/deliveryman/ports/in/create-deliveryman.use-case';
import { FindAllDeliverymansUseCase } from '../domain/deliveryman/ports/in/find-all-deliverymans.use-case';
import { FindAllDeliverymansService } from '../domain/deliveryman/services/find-all-deliverymans.service';
import { UpdateDeliverymansInfoUseCase } from '../domain/deliveryman/ports/in/update-deliveryman-info.use-case';
import { UpdateDeliverymansInfoService } from '../domain/deliveryman/services/update-deliverymans-info.service';
import { UpdateDeliverymansOrdersUseCase } from '../domain/deliveryman/ports/in/update-deliverymans-orders.dto';
import { CreateDeliverymanPort } from '../domain/deliveryman/ports/out/create-deliveryman.port';
import { FindAllDeliverymansPort } from '../domain/deliveryman/ports/out/find-all-deliverymans.port';
import { FindDeliverymanByIdWithOrdersPort } from '../domain/deliveryman/ports/out/find-deliveryman-by-id-with-orders.port';
import { SaveDeliverymanPort } from '../domain/deliveryman/ports/out/save-deliveryman.port';
import { FindAllOrdersUseCase } from '../domain/accounting-order/ports/in/find-all-orders.use-case';
import { FindOrderByIdUseCase } from '../domain/accounting-order/ports/in/find-order-by-id.use-case';
import { FindOrderByIdService } from '../domain/accounting-order/services/find-order-by-id.service';
import { UpdateOrderUseCase } from '../domain/accounting-order/ports/in/update-order.use-case';
import { UpdateOrderService } from '../domain/accounting-order/services/update-order.service';
import { FindAllOrdersPort } from '../domain/accounting-order/ports/out/find-all-orders.port';
import { FindOrderByIdPort } from '../domain/accounting-order/ports/out/find-order-by-id.port';
import { SaveOrderPort } from '../domain/accounting-order/ports/out/save-order.port';

@Module({
  imports: [TypeOrmModule.forFeature([OrderOrmEntity, DeliverymanOrmEntity])],
  controllers: [AccountingOrdersController, DeliverymanController],
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
      provide: FindAllOrdersUseCase,
      useClass: DeliverymanRepository,
    },
    {
      provide: FindOrderByIdUseCase,
      useClass: FindOrderByIdService,
    },
    {
      provide: UpdateOrderUseCase,
      useClass: UpdateOrderService,
    },
    {
      provide: FindAllOrdersPort,
      useClass: AccountingOrdersRepository,
    },
    {
      provide: FindOrderByIdPort,
      useClass: AccountingOrdersRepository,
    },
    {
      provide: SaveOrderPort,
      useClass: AccountingOrdersRepository,
    },
    AccountingOrdersRepository,
    DeliverymanRepository,
  ],
})
export class DeliveryModule {}
