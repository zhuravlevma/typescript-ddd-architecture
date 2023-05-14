import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { config } from './config';
import { DeliveryModule } from './delivery/delivery.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BillOfLadingPositionOrmEntity } from './accounting/dal/orm-entities/bill-of-lading-position.orm-entity';
import { AccountingModule } from './accounting/accounting.module';
import { BillOfLadingReportOrmEntity } from './accounting/dal/orm-entities/bill-of-lading-report.orm-entity';
import { ScheduleModule } from '@nestjs/schedule';
import { TasksService } from './__relay__/relay.service';
import { WarehouseModule } from './warehouse/warehouse.module';
import { OutboxOrmEntity } from './__relay__/outbox.orm-entity';
import { WarehouseOrmEntity } from './warehouse/dal/orm-entities/warehouse.orm-entity';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { OrderOrmEntity as WarehouseOrderOrmEntity } from './warehouse/dal/orm-entities/order.orm-entity';
import { DeliverymanOrmEntity } from './delivery/deliveryman/dal/orm-entities/deliveryman.orm-entity';
import { OrderOrmEntity } from './delivery/deliveryman/dal/orm-entities/orders.orm-entity';
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
        WarehouseOrderOrmEntity,
        OutboxOrmEntity,
      ],
      synchronize: true,
      logging: true,
    }),
    AccountingModule,
    DeliveryModule,
    WarehouseModule,
  ],
  controllers: [],
  providers: [TasksService],
})
export class AppModule {}
