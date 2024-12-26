import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { Saga } from './saga.model';
import { Compensation } from './compensation.model';
import { DomainMessage } from 'src/__lib__/domain-message';
import { MessageOrmEntity } from 'src/__relay__/message.orm-entity';

enum SagaStepStatuses {
  COMPENSATION = 'COMPENSATION',
  COMPLETE = 'COMPLETE',
}

@Entity('saga_steps')
export class SagaStep {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Saga, (saga) => saga.steps)
  @JoinColumn({ name: 'sagaId' })
  saga: Saga;

  @Column()
  stepName: string;

  @Column()
  status: SagaStepStatuses;

  @Column({ name: 'is_final', type: 'bool', default: false })
  isFinal: boolean;

  @CreateDateColumn()
  startedAt: Date;

  @UpdateDateColumn()
  completedAt: Date;

  @Column({ nullable: true })
  errorMessage: string;

  @Column({ default: 0 })
  retries: number;

  @OneToMany(() => Compensation, (compensation) => compensation.sagaStep, {
    cascade: ['insert', 'update'],
  })
  compensations: Compensation[];

  @Column({ type: 'jsonb', nullable: true })
  metadata: Record<string, any>;

  createStep(event: DomainMessage) {
    this.metadata = event;
    this.stepName = event.messageName;
    this.status = SagaStepStatuses.COMPLETE;
    this.isFinal = event.saga.isFinal;

    const newCompensation = new Compensation();
    newCompensation.createCompensation(event);

    if (this.compensations === undefined) {
      this.compensations = [];
    }

    this.compensations.push(newCompensation);
  }

  createCompensationStep(event: DomainMessage) {
    this.metadata = event;
    this.stepName = SagaStepStatuses.COMPENSATION;
    this.status = SagaStepStatuses.COMPENSATION;
    this.isFinal = event.saga.isFinal;
  }

  createCompleteStep(event: DomainMessage) {
    this.metadata = event;
    this.stepName = SagaStepStatuses.COMPLETE;
    this.status = SagaStepStatuses.COMPENSATION;
    this.isFinal = event.saga.isFinal;
  }

  compensate(event: DomainMessage): MessageOrmEntity[] {
    this.status = SagaStepStatuses.COMPENSATION;
    return this.compensations.map((compensation) => {
      const orm = new MessageOrmEntity();

      orm.reason = compensation.metadata.reason;
      orm.messageType = compensation.metadata.messageType;
      orm.payload = compensation.metadata.payload;
      orm.aggregateId = compensation.metadata.aggregateId;
      orm.aggregateName = compensation.metadata.aggregateName;
      orm.contextName = compensation.metadata.contextName;
      orm.correlationId = event.saga.correlationId;
      orm.messageName = compensation.metadata.messageName;
      orm.compensationEvent = {};
      orm.sagaId = event.saga.sagaId;
      return orm;
    });
  }
}
