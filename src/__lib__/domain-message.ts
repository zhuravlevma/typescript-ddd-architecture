export enum MessageTypeEnum {
  command = 'command',
  event = 'event',
}

export interface MessageType {
  messageType: MessageTypeEnum; // event or command
}

interface PayloadObject<Payload = object>
  extends DomainMessageAttributes<Payload> {
  payload: Payload;
}

interface DomainMessageAllAttributes<Payload = object>
  extends DomainMessageAttributes<Payload> {
  reason: string;
  payload: Payload;
  messageName: string; // name of the event or command "WarehouseCreated"(event), "AddOrder"(command)
  aggregateId: string; // necessary for partitioning
  aggregateName: string; // Can be often useful (for example for humans or for id prefixes)
  contextName: string; // Can be often useful (for example for humans or for id prefixes)
  compensation?: DomainMessage;
  sagaId?: string;
  isFinal?: boolean;
}

export interface DomainMessageAttributes<Payload = object> {
  payload: Payload;
  aggregateId: string;
  correlationId?: string;
  compensation?: DomainMessage<object>;
  isFinal?: boolean;
  error?: boolean;
  sagaId?: string;
}

export type DomainMessage<Payload = object> =
  DomainMessageAllAttributes<Payload> & MessageType;

export abstract class DomainEvent<Payload = object>
  implements DomainMessage<Payload>
{
  reason: string;
  payload: Payload;
  messageType: MessageTypeEnum;
  messageName: string;
  aggregateId: string;
  aggregateName: string;
  contextName: string;
  compensation?: DomainMessage<object>;
  correlationId: string;
  isFinal?: boolean;
  error?: boolean;
  sagaId?: string;

  constructor(attributes: DomainMessageAllAttributes<Payload>) {
    this.contextName = attributes.contextName;
    this.reason = attributes.reason;
    this.payload = attributes.payload;
    this.messageType = MessageTypeEnum.event;
    this.messageName = attributes.messageName;
    this.aggregateId = attributes.aggregateId;
    this.aggregateName = attributes.aggregateName;
    this.contextName = attributes.contextName;
    this.compensation = attributes.compensation;
    this.isFinal = attributes.isFinal;
    this.correlationId = attributes.correlationId;
    this.sagaId = attributes.sagaId;
  }
}

export abstract class DomainCommand<Payload = object>
  implements PayloadObject<Payload>, MessageType
{
  reason: string;
  payload: Payload;
  messageType: MessageTypeEnum;
  messageName: string;
  aggregateId: string;
  aggregateName: string;
  contextName: string;
  compensation?: DomainMessage<object>;
  correlationId: string;
  isFinal?: boolean;
  error?: boolean;
  sagaId?: string;

  constructor(attributes: DomainMessageAllAttributes<Payload>) {
    this.contextName = attributes.contextName;
    this.reason = attributes.reason;
    this.payload = attributes.payload;
    this.messageType = MessageTypeEnum.command;
    this.messageName = attributes.messageName;
    this.aggregateId = attributes.aggregateId;
    this.aggregateName = attributes.aggregateName;
    this.contextName = attributes.contextName;
    this.compensation = attributes.compensation;
    this.isFinal = attributes.isFinal;
    this.correlationId = attributes.correlationId;
    this.sagaId = attributes.sagaId;
  }
}
