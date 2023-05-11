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

@Module({
  imports: [
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
      ],
      synchronize: true,
      logging: true,
    }),
    AccountingOrderModule,
    DeliverymanModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
