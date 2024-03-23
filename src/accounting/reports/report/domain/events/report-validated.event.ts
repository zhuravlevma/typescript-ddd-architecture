import { DomainEvent, DomainMessageAttributes } from 'src/__lib__/domain-message';
import { config } from 'src/config';

interface ReportValidatedPayload {
  orderId: string;
}

export class ReportValidatedEvent extends DomainEvent<ReportValidatedPayload> {
  constructor(attributes: DomainMessageAttributes<ReportValidatedPayload>) {
    super({
      reason: 'The report was validated',
      payload: attributes.payload,
      messageName: config().topics.reportValidated,
      aggregateId: attributes.aggregateId,
      aggregateName: 'Report',
      contextName: 'accounting',
    });
  }
}
