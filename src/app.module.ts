import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { config } from './config';
import { DeliverymanModule } from './deliveryman/deliveryman.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BillOfLadingPositionOrmEntity } from './accounting-order/dal/orm-entities/bill-of-lading-position.orm-entity';
import { DeliverymanOrmEntity } from './deliveryman/dal/orm-entities/deliveryman.orm-entity';
import { AccountingOrderModule } from './accounting-order/accounting-order.module';
import { OrderOrmEntity } from './deliveryman/dal/orm-entities/orders.orm-entity';
import { BillOfLadingReportOrmEntity } from './accounting-order/dal/orm-entities/bill-of-lading-report.orm-entity';
import { ScheduleModule } from '@nestjs/schedule';
import { TasksService } from './__relay__/relay.service';
import { WarehouseModule } from './warehouse/warehouse.module';
import { OutboxOrmEntity } from './__relay__/outbox.orm-entity';
import { WarehouseOrmEntity } from './warehouse/dal/orm-entities/warehouse.orm-entity';
import { EventEmitterModule } from '@nestjs/event-emitter';

@Module({
  imports: [
    EventEmitterModule.forRoot(), // move to relay module
    TypeOrmModule.forFeature([OutboxOrmEntity]), // move to relay module
    ScheduleModule.forRoot(),
    ConfigModule.forRoot({
      load: [config],
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: config().database.host,
      port: config().database.port,
      username: config().database.username,
      password: config().database.password,
      database: config().database.name,
      entities: [
        OrderOrmEntity,
        DeliverymanOrmEntity,
        BillOfLadingPositionOrmEntity,
        BillOfLadingReportOrmEntity,
        WarehouseOrmEntity,
        OutboxOrmEntity,
      ],
      synchronize: true,
      logging: true,
    }),
    AccountingOrderModule,
    DeliverymanModule,
    WarehouseModule,
  ],
  controllers: [],
  providers: [TasksService],
})
export class AppModule {}
