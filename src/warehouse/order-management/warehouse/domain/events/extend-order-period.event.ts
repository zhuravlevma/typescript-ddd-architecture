import {
  DomainEvent,
  DomainMessageAttributes,
} from 'src/__lib__/domain-message';
import { config } from 'src/config';

interface ExtendOrderPeriodPayload {
  orderId: string;
  warehouseId: string;
}

export class ExtendOrderPeriodEvent extends DomainEvent<ExtendOrderPeriodPayload> {
  constructor(attributes: DomainMessageAttributes<ExtendOrderPeriodPayload>) {
    super({
      reason: 'Extend the order',
      payload: attributes.payload,
      messageName: config().topics.extendOrderPeriod,
      aggregateId: attributes.aggregateId,
      aggregateName: 'Warehouse',
      contextName: 'warehouse',
    });
  }
}
