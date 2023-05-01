import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DeliverymanOrmEntity } from './infrastructure/dal/orm-entities/deliveryman.orm-entity';
import { OrderOrmEntity } from './infrastructure/dal/orm-entities/orders.orm-entity';
import { InfrastructureModule } from './infrastructure/infrastructure.module';
import { ConfigModule } from '@nestjs/config';
import { config } from './config';
import { BillOfLadingPositionOrmEntity } from './infrastructure/dal/orm-entities/bill-of-lading-position.orm-entity';
import { AccountingOrderModule } from './accounting-order/accounting-order.module';
import { DeliverymanModule } from './deliveryman/deliveryman.module';

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
    }),
    InfrastructureModule,
    AccountingOrderModule,
    DeliverymanModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
