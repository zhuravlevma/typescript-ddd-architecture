import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DeliverymanOrmEntity } from './delivery/infrastructure/dal/orm-entities/deliveryman.orm-entity';
import { OrderOrmEntity } from './delivery/infrastructure/dal/orm-entities/orders.orm-entity';
import { DeliveryModule } from './delivery/infrastructure/delivery.module';
import { ConfigModule } from '@nestjs/config';
import { config } from './config';
import { BillOfLadingPositionOrmEntity } from './delivery/infrastructure/dal/orm-entities/bill-of-lading-position.orm-entity';

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
    DeliveryModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
