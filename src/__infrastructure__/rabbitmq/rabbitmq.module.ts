import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { Global, Module } from '@nestjs/common';
import { config } from 'src/config';

@Global()
@Module({
  imports: [
    RabbitMQModule.forRoot(RabbitMQModule, {
      exchanges: [
        {
          name: config().rabbitmq.exchange,
          type: 'direct',
        },
      ],
      uri: config().rabbitmq.url,
      enableControllerDiscovery: true,
    }),
  ],
  exports: [RabbitMQModule],
})
export class RabbitModule {}
