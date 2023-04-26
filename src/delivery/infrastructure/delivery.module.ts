import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderOrmEntity } from './orm-entities/orders.orm-entity';
import { AccountingOrdersService } from '../domain/accounting-order/services/accounting-orders.service';
import { AccountingOrdersController } from './controllers/accounting-orders.controller';
import { AccountingOrdersRepository } from './repositories/accounting-orders.repository';
import { DeliverymanController } from './controllers/deliveryman.controller';
import { DeliverymanRepository } from './repositories/deliveryman.repository';
import { DeliverymanOrmEntity } from './orm-entities/deliveryman.orm-entity';
import { DeliverymanService } from '../domain/deliveryman/services/create-deliveryman.service';

@Module({
  imports: [TypeOrmModule.forFeature([OrderOrmEntity, DeliverymanOrmEntity])],
  controllers: [AccountingOrdersController, DeliverymanController],
  providers: [
    AccountingOrdersService,
    AccountingOrdersRepository,
    DeliverymanService,
    DeliverymanRepository,
  ],
})
export class DeliveryModule {}
