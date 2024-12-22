export abstract class CreateSagaOutPort {
  abstract createSaga(correlationId: string): Promise<string>;
}
