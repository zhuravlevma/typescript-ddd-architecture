import { Module } from '@nestjs/common';
import { InfrastructureModule } from './infrastructure/infrastructure.module';
import { ConfigModule } from '@nestjs/config';
import { config } from './config';
import { AccountingOrderModule } from './accounting-order/accounting-order.module';
import { DeliverymanModule } from './deliveryman/deliveryman.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [config],
    }),
    InfrastructureModule,
    AccountingOrderModule,
    DeliverymanModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
