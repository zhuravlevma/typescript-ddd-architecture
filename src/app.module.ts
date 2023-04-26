import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DeliverymanOrmEntity } from './delivery/infrastructure/orm-entities/deliveryman.orm-entity';
import { OrderOrmEntity } from './delivery/infrastructure/orm-entities/orders.orm-entity';
import { DeliveryModule } from './delivery/infrastructure/delivery.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'maksim',
      password: '123321',
      database: 'postgres',
      entities: [OrderOrmEntity, DeliverymanOrmEntity],
      synchronize: true,
    }),
    DeliveryModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
