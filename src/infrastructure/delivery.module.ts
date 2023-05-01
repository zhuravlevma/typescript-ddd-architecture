import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderOrmEntity } from './dal/orm-entities/orders.orm-entity';
import { AccountingOrdersController } from './web/controllers/accounting-orders.controller';
import { DeliverymanController } from './web/controllers/deliveryman.controller';
import { DeliverymanOrmEntity } from './dal/orm-entities/deliveryman.orm-entity';
import { CreateDeliverymanService } from '../deliveryman/services/create-deliveryman.service';
import { AddOrderToDeliverymanUseCase } from '../deliveryman/ports/in/add-order-to-deliveryman.use-case';
import { AddOrderToDeliverymanService } from '../deliveryman/services/add-order-to-deliveryman.service';
import { ChangeDeliverymansStatusUseCase } from '../deliveryman/ports/in/change-deliverymans-status.use-case';
import { ChangeDeliverymansStatusService } from '../deliveryman/services/change-deliverymans-status.service';
import { CreateDeliverymanUseCase } from '../deliveryman/ports/in/create-deliveryman.use-case';
import { FindAllDeliverymansUseCase } from '../deliveryman/ports/in/find-all-deliverymans.use-case';
import { FindAllDeliverymansService } from '../deliveryman/services/find-all-deliverymans.service';
import { UpdateDeliverymansInfoUseCase } from '../deliveryman/ports/in/update-deliveryman-info.use-case';
import { UpdateDeliverymansInfoService } from '../deliveryman/services/update-deliverymans-info.service';
import { UpdateDeliverymansOrdersUseCase } from '../deliveryman/ports/in/update-deliverymans-orders.dto';
import { CreateDeliverymanPort } from '../deliveryman/ports/out/create-deliveryman.port';
import { FindAllDeliverymansPort } from '../deliveryman/ports/out/find-all-deliverymans.port';
import { FindDeliverymanByIdWithOrdersPort } from '../deliveryman/ports/out/find-deliveryman-by-id-with-orders.port';
import { SaveDeliverymanPort } from '../deliveryman/ports/out/save-deliveryman.port';
import { FindAllOrdersUseCase } from '../accounting-order/ports/in/find-all-orders.use-case';
import { FindOrderByIdUseCase } from '../accounting-order/ports/in/find-order-by-id.use-case';
import { FindOrderByIdService } from '../accounting-order/services/find-order-by-id.service';
import { UpdateOrderUseCase } from '../accounting-order/ports/in/update-order.use-case';
import { UpdateOrderService } from '../accounting-order/services/update-order.service';
import { FindAllOrdersPort } from '../accounting-order/ports/out/find-all-orders.port';
import { FindOrderByIdPort } from '../accounting-order/ports/out/find-order-by-id.port';
import { SaveOrderPort } from '../accounting-order/ports/out/save-order.port';
import { DeliverymanRepository } from './dal/repositories/deliveryman.repository';
import { AccountingOrdersRepository } from './dal/repositories/accounting-orders.repository';
import { BillOfLadingPositionOrmEntity } from './dal/orm-entities/bill-of-lading-position.orm-entity';
import { UpdateOrderStatusUseCase } from '../deliveryman/ports/in/update-order-status.use-case';
import { UpdateOrderStatusService } from '../deliveryman/services/update-order-status.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      OrderOrmEntity,
      DeliverymanOrmEntity,
      BillOfLadingPositionOrmEntity,
    ]),
  ],
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
    {
      provide: UpdateOrderStatusUseCase,
      useClass: UpdateOrderStatusService,
    },
    AccountingOrdersRepository,
    DeliverymanRepository,
  ],
})
export class DeliveryModule {}
