import { Module } from '@nestjs/common';
import { UpdateDeliverymansInfoService } from './services/update-deliverymans-info.service';
import { UpdateDeliverymansOrdersUseCase } from './ports/in/update-deliverymans-orders.dto';
import { UpdateDeliverymansInfoUseCase } from './ports/in/update-deliveryman-info.use-case';
import { FindAllDeliverymansService } from './services/find-all-deliverymans.service';
import { FindAllDeliverymansUseCase } from './ports/in/find-all-deliverymans.use-case';
import { CreateDeliverymanUseCase } from './ports/in/create-deliveryman.use-case';
import { CreateDeliverymanService } from './services/create-deliveryman.service';
import { ChangeDeliverymansStatusService } from './services/change-deliverymans-status.service';
import { ChangeDeliverymansStatusUseCase } from './ports/in/change-deliverymans-status.use-case';
import { AddOrderToDeliverymanService } from './services/add-order-to-deliveryman.service';
import { AddOrderToDeliverymanUseCase } from './ports/in/add-order-to-deliveryman.use-case';
import { UpdateOrderStatusUseCase } from './ports/in/update-order-status.use-case';
import { UpdateOrderStatusService } from './services/update-order-status.service';

@Module({
  imports: [],
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
  ],
  exports: [
    AddOrderToDeliverymanUseCase,
    ChangeDeliverymansStatusUseCase,
    CreateDeliverymanUseCase,
    FindAllDeliverymansUseCase,
    UpdateDeliverymansInfoUseCase,
    UpdateDeliverymansOrdersUseCase,
    UpdateOrderStatusUseCase,
  ],
})
export class DeliverymanModule {}
