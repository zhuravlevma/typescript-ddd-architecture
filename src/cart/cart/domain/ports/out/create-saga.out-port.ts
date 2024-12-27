export class CheckSagaApiDto {
  correlationId: string;
}
export abstract class CreateSagaOutPort {
  abstract createSaga(checkSagaApiDto: CheckSagaApiDto): Promise<string>;
}
