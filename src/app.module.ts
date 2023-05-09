import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { config } from './config';
import { DeliverymanModule } from './deliveryman/deliveryman.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BillOfLadingPositionOrmEntity } from './__typeorm/bill-of-lading-position.orm-entity';
import { DeliverymanOrmEntity } from './__typeorm/deliveryman.orm-entity';
import { OrderOrmEntity } from './__typeorm/orders.orm-entity';
import { AccountingOrderModule } from './accounting-order/accounting-order.module';

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
