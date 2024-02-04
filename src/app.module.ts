import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { config } from './config';
import { DeliveryModule } from './delivery/delivery.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountingModule } from './accounting/accounting.module';
import { WarehouseModule } from './warehouse/warehouse.module';
import { MessageOrmEntity } from './__relay__/message.orm-entity';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { OrderOrmEntity as WarehouseOrderOrmEntity } from './warehouse/order-management/warehouse/dal/orm-entities/order.orm-entity';
import { CurierOrmEntity } from './delivery/curiers/curier/dal/orm-entities/curier.orm-entity';
import { OrderOrmEntity } from './delivery/curiers/curier/dal/orm-entities/orders.orm-entity';
import { OfferOrmEntity } from './delivery/board/offer/dal/orm-entities/offer.orm-entity';
import { ReportPositionOrmEntity } from './accounting/reports/report/dal/orm-entities/report-position.orm-entity';
import { ReportOrmEntity } from './accounting/reports/report/dal/orm-entities/report.orm-entity';
import { WarehouseOrmEntity } from './warehouse/order-management/warehouse/dal/orm-entities/warehouse.orm-entity';
import { RelayModule } from './__relay__/relay.module';
@Module({
  imports: [
    EventEmitterModule.forRoot(),
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
        CurierOrmEntity,
        ReportPositionOrmEntity,
        ReportOrmEntity,
        WarehouseOrmEntity,
        WarehouseOrderOrmEntity,
        MessageOrmEntity,
        OfferOrmEntity,
      ],
      synchronize: true,
      logging: true,
    }),
    RelayModule,
    AccountingModule,
    DeliveryModule,
    WarehouseModule,
  ],
})
export class AppModule {}
