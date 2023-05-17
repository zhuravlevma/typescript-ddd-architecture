export interface DomainEvent<Payload = object> {
  id: string;
  type: string;
  reason: string;
  payload: Payload;
}
