import { Injectable } from '@nestjs/common';
import { isString } from 'class-validator';
import { InjectAsyncContextStorage } from '../context/decorator';
import { CORRELATION_ID_KEY } from './constants';
import { ContextStorage } from '../context/context-middleware';
import { randomUUID } from 'crypto';

const doesExistAndValid = isString;

@Injectable()
export class CorrelationService {
  constructor(
    @InjectAsyncContextStorage()
    private readonly asyncContextStorage: ContextStorage,
  ) {}

  public startNewCorrelationId(existingCorrelationId?: string | any): string {
    const correlationId = doesExistAndValid(existingCorrelationId)
      ? existingCorrelationId
      : randomUUID();

    const contextStore = this.asyncContextStorage.getStore();

    if (contextStore) {
      contextStore.set(CORRELATION_ID_KEY, correlationId);
    }
    return correlationId;
  }

  public getCorrelationId(): string {
    const store = this.asyncContextStorage.getStore();

    return store?.get(CORRELATION_ID_KEY) ?? '';
  }
}
