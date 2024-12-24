import {
  DomainEvent,
  SagaMessageCompensationAttributes,
} from 'src/__lib__/domain-message';
import { config } from 'src/config';

export class SagaCompensationEvent extends DomainEvent {
  constructor(attributes: SagaMessageCompensationAttributes) {
    super({
      reason: 'Compesation',
      payload: {},
      messageName: config().topics.sagaReceived,
      aggregateId: attributes.aggregateId,
      aggregateName: '',
      contextName: '',
      saga: {
        ...attributes.saga,
        runCompensation: true,
      },
    });
  }
}
