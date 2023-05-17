import { DomainEvent } from 'src/__relay__/domain-event';

interface ReportValidatedPayload {
  orderId: string;
}

export class ReportValidatedEvent
  implements DomainEvent<ReportValidatedPayload>
{
  id: string;
  type: string;
  reason: string;
  payload: ReportValidatedPayload;
  constructor(attributes: DomainEvent<ReportValidatedPayload>) {
    this.id = attributes.id;
    this.type = attributes.type;
    this.reason = attributes.reason;
    this.payload = attributes.payload;
  }
}
