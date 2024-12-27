import { Global, Module } from '@nestjs/common';
import { RegistatorController } from './registrator.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Saga } from './models/saga.model';
import { SagaStep } from './models/saga-step.model';
import { Compensation } from './models/compensation.model';
import { RegistatorService } from './registrator.service';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([Saga, SagaStep, Compensation])],
  providers: [RegistatorService],
  controllers: [RegistatorController],
  exports: [],
})
export class SagaModule {}
