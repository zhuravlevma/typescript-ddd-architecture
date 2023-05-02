import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderOrmEntity } from './dal/orm-entities/orders.orm-entity';
import { AccountingOrdersController } from './web/controllers/accounting-orders.controller';
import { DeliverymanController } from './web/controllers/deliveryman.controller';
import { DeliverymanOrmEntity } from './dal/orm-entities/deliveryman.orm-entity';
import { CreateDeliverymanPort } from '../deliveryman/ports/out/create-deliveryman.port';
import { FindAllDeliverymansPort } from '../deliveryman/ports/out/find-all-deliverymans.port';
import { FindDeliverymanByIdWithOrdersPort } from '../deliveryman/ports/out/find-deliveryman-by-id-with-orders.port';
import { SaveDeliverymanPort } from '../deliveryman/ports/out/save-deliveryman.port';
import { FindAllOrdersPort } from '../accounting-order/ports/out/find-all-orders.port';
import { FindOrderByIdPort } from '../accounting-order/ports/out/find-order-by-id.port';
import { SaveOrderPort } from '../accounting-order/ports/out/save-order.port';
import { DeliverymanRepository } from './dal/repositories/deliveryman.repository';
import { AccountingOrdersRepository } from './dal/repositories/accounting-orders.repository';
import { BillOfLadingPositionOrmEntity } from './dal/orm-entities/bill-of-lading-position.orm-entity';
import { AccountingOrderModule } from 'src/accounting-order/accounting-order.module';
import { DeliverymanModule } from 'src/deliveryman/deliveryman.module';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('database.host'),
        port: configService.get<number>('database.port'),
        username: configService.get<string>('database.username'),
        password: configService.get<string>('database.password'),
        database: configService.get<string>('database.name'),
        entities: [
          OrderOrmEntity,
          DeliverymanOrmEntity,
          BillOfLadingPositionOrmEntity,
        ],
        synchronize: true,
        logging: true,
      }),
      inject: [ConfigService],
    }),
    AccountingOrderModule,
    DeliverymanModule,
    TypeOrmModule.forFeature([
      OrderOrmEntity,
      DeliverymanOrmEntity,
      BillOfLadingPositionOrmEntity,
    ]),
  ],
  controllers: [AccountingOrdersController, DeliverymanController],
  providers: [
    {
      provide: CreateDeliverymanPort,
      useClass: DeliverymanRepository,
    },
    {
      provide: FindAllDeliverymansPort,
      useClass: DeliverymanRepository,
    },
    {
      provide: FindDeliverymanByIdWithOrdersPort,
      useClass: DeliverymanRepository,
    },
    {
      provide: SaveDeliverymanPort,
      useClass: DeliverymanRepository,
    },
    {
      provide: FindAllOrdersPort,
      useClass: AccountingOrdersRepository,
    },
    {
      provide: FindOrderByIdPort,
      useClass: AccountingOrdersRepository,
    },
    {
      provide: SaveOrderPort,
      useClass: AccountingOrdersRepository,
    },
    AccountingOrdersRepository,
    DeliverymanRepository,
  ],
})
export class InfrastructureModule {}
