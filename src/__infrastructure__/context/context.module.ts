import { AsyncLocalStorage } from 'async_hooks';

import { Global, Module } from '@nestjs/common';

import { CONTEXT_STORAGE } from './constants';

@Global()
@Module({
  providers: [
    {
      provide: CONTEXT_STORAGE,
      useValue: new AsyncLocalStorage<Map<string, string>>(),
    },
  ],
  exports: [CONTEXT_STORAGE],
})
export class ContextModule {}
