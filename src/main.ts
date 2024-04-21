import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { RmqOptions, Transport } from '@nestjs/microservices';
import { config } from './config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configSwagger = new DocumentBuilder()
    .setTitle('App example')
    .setDescription('API description')
    .setVersion('1.0')
    .build();

  app.connectMicroservice<RmqOptions>({
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

  app.connectMicroservice<RmqOptions>({
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

  app.connectMicroservice<RmqOptions>({
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

  await app.startAllMicroservices();

  const document = SwaggerModule.createDocument(app, configSwagger);
  SwaggerModule.setup('swagger', app, document);
  await app.listen(3000);
}
bootstrap();
