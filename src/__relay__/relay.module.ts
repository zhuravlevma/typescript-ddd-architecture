import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MessageOrmEntity } from './message.orm-entity';
import { RelayService } from './relay.service';
import { ScheduleModule } from '@nestjs/schedule';
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';
import { config } from 'src/config';
import {
  OFFER_TAKED_CLIENT,
  ORDER_VALIDATED_CLIENT,
  REPORT_VALIDATED_CLIENT,
} from './clients';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    TypeOrmModule.forFeature([MessageOrmEntity]),
  ],
  controllers: [],
  providers: [
    RelayService,
    {
      provide: OFFER_TAKED_CLIENT,
      useFactory: (): ClientProxy => {
        return ClientProxyFactory.create({
          transport: Transport.RMQ,
          options: {
            urls: [config().rabbitmq.url],
            queue: config().topics.offerTaked,
            queueOptions: {
              durable: false,
            },
            socketOptions: {
              heartbeatIntervalInSeconds: 60,
              reconnectTimeInSeconds: 5,
            },
          },
        });
      },
    },
    {
      provide: ORDER_VALIDATED_CLIENT,
      useFactory: (): ClientProxy => {
        return ClientProxyFactory.create({
          transport: Transport.RMQ,
          options: {
            urls: [config().rabbitmq.url],
            queue: config().topics.orderValidated,
            queueOptions: {
              durable: false,
            },
            socketOptions: {
              heartbeatIntervalInSeconds: 60,
              reconnectTimeInSeconds: 5,
            },
          },
        });
      },
    },
    {
      provide: REPORT_VALIDATED_CLIENT,
      useFactory: (): ClientProxy => {
        return ClientProxyFactory.create({
          transport: Transport.RMQ,
          options: {
            urls: [config().rabbitmq.url],
            queue: config().topics.reportValidated,
            queueOptions: {
              durable: false,
            },
            socketOptions: {
              heartbeatIntervalInSeconds: 60,
              reconnectTimeInSeconds: 5,
            },
          },
        });
      },
    },
  ],
})
export class RelayModule {}
