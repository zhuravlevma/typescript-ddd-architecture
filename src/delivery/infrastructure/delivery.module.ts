import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './orm-entities/orders.model';
import { OrdersService } from './services/orders.service';
import { OrdersController } from './controllers/orders.controller';
import { OrdersRepository } from './repositories/orders.repository';
import { DeliverymanController } from './controllers/deliveryman.controller';
import { DeliverymanService } from './services/deliveryman.service';
import { DeliverymanRepository } from './repositories/deliveryman.repository';
import { Deliveryman } from './orm-entities/deliveryman.model';

@Module({
  imports: [TypeOrmModule.forFeature([Order, Deliveryman])],
  controllers: [OrdersController, DeliverymanController],
  providers: [
    OrdersService,
    OrdersRepository,
    DeliverymanService,
    DeliverymanRepository,
  ],
})
export class DeliveryModule {}
