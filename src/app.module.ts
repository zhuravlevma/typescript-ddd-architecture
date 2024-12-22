import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { config } from './config';
import { DeliveryModule } from './delivery/delivery.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountingModule } from './accounting/accounting.module';
import { WarehouseModule } from './warehouse/warehouse.module';
import { MessageOrmEntity } from './__relay__/message.orm-entity';
import { OrderOrmEntity as WarehouseOrderOrmEntity } from './warehouse/order-management/warehouse/dal/orm-entities/order.orm-entity';
import { CurierOrmEntity } from './delivery/curiers/curier/dal/orm-entities/curier.orm-entity';
import { OrderOrmEntity } from './delivery/curiers/curier/dal/orm-entities/orders.orm-entity';
import { OfferOrmEntity } from './delivery/board/offer/dal/orm-entities/offer.orm-entity';
import { ReportPositionOrmEntity } from './accounting/reports/report/dal/orm-entities/report-position.orm-entity';
import { ReportOrmEntity } from './accounting/reports/report/dal/orm-entities/report.orm-entity';
import { WarehouseOrmEntity } from './warehouse/order-management/warehouse/dal/orm-entities/warehouse.orm-entity';
import { RelayModule } from './__relay__/relay.module';
import { CorrelationModule } from './__infrastructure__/correlation/correlation.module';
import { ContextMiddleware } from './__infrastructure__/context/context-middleware';
import { SagaModule } from './__saga__/saga.module';
import { RabbitModule } from './__infrastructure__/rabbitmq/rabbitmq.module';
import { Saga } from './__saga__/models/saga.model';
import { SagaStep } from './__saga__/models/saga-step.model';
import { Compensation } from './__saga__/models/compensation.model';
import { CartOrmEntity } from './cart/cart/dal/orm-entities/cart.orm-entity';
import { CartPositionOrmEntity } from './cart/cart/dal/orm-entities/cart-position.orm-entity';
import { CartModule } from './cart/cart/cart.module';
import { PaymentModule } from './cart/payment/payment.module';
import { Payment } from './cart/payment/models/payment.model';
@Module({
  imports: [
    ConfigModule.forRoot({
      load: [config],
    }),
    RabbitModule,
    CorrelationModule,
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
        Saga,
        SagaStep,
        Compensation,
        CartOrmEntity,
        CartPositionOrmEntity,
        Payment,
      ],
      synchronize: true,
      logging: true,
    }),
    RelayModule,
    AccountingModule,
    DeliveryModule,
    WarehouseModule,
    SagaModule,
    CartModule,
    PaymentModule,
  ],
})
export class AppModule {
  public configure(consumer: MiddlewareConsumer): any {
    consumer.apply(ContextMiddleware).forRoutes('*');
  }
}
