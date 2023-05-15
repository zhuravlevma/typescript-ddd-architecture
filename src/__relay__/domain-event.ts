export interface DomainEvent {
  id: string;
  type: string;
  reason: string;
  payload: Map<string, string>;
}
