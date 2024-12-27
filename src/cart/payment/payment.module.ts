import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Payment } from './models/payment.model';
import { PaymentController } from './controllers/payment.controller';
import { PaymentService } from './services/payment.service';
import { ExternalPaymentApi } from './api/external-payment-api';
import { MessageOrmEntity } from 'src/__relay__/message.orm-entity';

@Module({
  imports: [TypeOrmModule.forFeature([Payment, MessageOrmEntity])],
  controllers: [PaymentController],
  providers: [PaymentService, ExternalPaymentApi],
})
export class PaymentModule {}
