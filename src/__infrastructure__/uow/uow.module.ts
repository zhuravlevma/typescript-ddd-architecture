import { Global, Module } from '@nestjs/common';
import { TypeOrmUnitOfWork } from './uow';

@Global()
@Module({
  imports: [],
  controllers: [],
  providers: [TypeOrmUnitOfWork],
  exports: [TypeOrmUnitOfWork],
})
export class UOWModule {}
