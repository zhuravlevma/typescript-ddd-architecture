import { Injectable, NestMiddleware } from '@nestjs/common';
import * as http from 'http';
import { AsyncLocalStorage } from 'async_hooks';
import { InjectAsyncContextStorage } from './decorator';

export type ContextStorage = AsyncLocalStorage<Map<string, string>>;

@Injectable()
export class ContextMiddleware implements NestMiddleware {
  constructor(
    @InjectAsyncContextStorage()
    private readonly asyncContextStorage: ContextStorage,
  ) {}

  public use(_: http.IncomingMessage, __: http.ServerResponse, next: () => void): void {
    this.asyncContextStorage.run(new Map(), () => {
      next();
    });
  }
}
