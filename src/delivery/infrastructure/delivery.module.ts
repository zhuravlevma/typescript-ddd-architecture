import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderOrmEntity } from './orm-entities/orders.orm-entity';
import { OrdersService } from './services/orders.service';
import { OrdersController } from './controllers/orders.controller';
import { OrdersRepository } from './repositories/orders.repository';
import { DeliverymanController } from './controllers/deliveryman.controller';
import { DeliverymanService } from './services/deliveryman.service';
import { DeliverymanRepository } from './repositories/deliveryman.repository';
import { DeliverymanOrmEntity } from './orm-entities/deliveryman.orm-entity';

@Module({
  imports: [TypeOrmModule.forFeature([OrderOrmEntity, DeliverymanOrmEntity])],
  controllers: [OrdersController, DeliverymanController],
  providers: [
    OrdersService,
    OrdersRepository,
    DeliverymanService,
    DeliverymanRepository,
  ],
})
export class DeliveryModule {}
