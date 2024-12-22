import { Injectable } from '@nestjs/common';
import { Payment } from '../models/payment.model';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ExternalPaymentApi } from '../api/external-payment-api';
import { OrderCreatedEvent } from 'src/cart/cart/domain/events/order-created.event';
import { MessageOrmEntity } from 'src/__relay__/message.orm-entity';
import { PaymentCompletedEvent } from '../events/payment-completed.event';
import { PaymentFailedEvent } from '../events/payment-failed.event';
import { OutboxMapper } from 'src/__relay__/outbox.mapper';

@Injectable()
export class PaymentService {
  constructor(
    @InjectRepository(Payment)
    private readonly paymentRepository: Repository<Payment>,
    @InjectRepository(MessageOrmEntity)
    private readonly ormRepository: Repository<MessageOrmEntity>,
    private readonly externalPaymentApi: ExternalPaymentApi,
  ) {}

  async create(event: OrderCreatedEvent): Promise<Payment> {
    const payment = await this.paymentRepository.save({
      orderId: event.payload.orderId,
      userId: event.payload.userId,
      correlationId: event.correlationId,
    });

    const paymentResult = await this.externalPaymentApi.pay({
      userId: event.payload.userId,
    });

    if (paymentResult !== 'OK') {
      await this.ormRepository.save(
        OutboxMapper.mapToORM(
          new PaymentCompletedEvent({
            aggregateId: payment.id,
            payload: {
              paymentId: payment.id,
              positions: event.payload.positions,
              orderId: event.payload.orderId,
            },
            correlationId: event.correlationId,
            compensation: new PaymentFailedEvent({
              aggregateId: payment.id,
              payload: {
                paymentId: payment.id,
              },
              correlationId: event.correlationId,
            }),
            sagaId: event.sagaId,
          }),
          event.correlationId,
        ),
      );
    }

    return payment;
  }
}
