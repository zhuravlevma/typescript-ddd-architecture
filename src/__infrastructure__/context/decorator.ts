import { Inject } from '@nestjs/common';
import { CONTEXT_STORAGE } from './constants';

export const InjectAsyncContextStorage = (): ReturnType<typeof Inject> => Inject(CONTEXT_STORAGE);
