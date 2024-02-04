import {
  DomainEvent,
  DomainMessageAttributes,
} from 'src/__lib__/domain-message';

interface ReportValidatedPayload {
  orderId: string;
}

export class ReportValidatedEvent extends DomainEvent<ReportValidatedPayload> {
  constructor(attributes: DomainMessageAttributes<ReportValidatedPayload>) {
    super({
      reason: 'The order was validated',
      payload: attributes.payload,
      messageName: 'report-validated',
      aggregateId: attributes.aggregateId,
      aggregateName: 'Report',
      contextName: 'accounting',
      correlationId: attributes.correlationId,
    });
  }
}
