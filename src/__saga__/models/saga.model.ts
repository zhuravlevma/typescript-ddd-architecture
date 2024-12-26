import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { SagaStep } from './saga-step.model';
import { DomainMessage } from 'src/__lib__/domain-message';
import { MessageOrmEntity } from 'src/__relay__/message.orm-entity';

@Entity('sagas')
export class Saga {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid', { unique: true })
  correlationId: string;

  @Column()
  sagaType: string;

  @Column()
  status: string; // InProgress, Completed, Compensated, Failed

  @CreateDateColumn()
  startedAt: Date;

  @UpdateDateColumn()
  completedAt: Date;

  @Column({ default: 0 })
  retries: number;

  @Column({ nullable: true })
  currentStep: string;

  @Column({ type: 'jsonb', nullable: true })
  metadata: Record<string, any>;

  @OneToMany(() => SagaStep, (step) => step.saga, {
    cascade: ['insert', 'update'],
  })
  steps: SagaStep[];

  addCommonStep(event: DomainMessage) {
    const newStep = new SagaStep();
    newStep.createStep(event);

    if (this.steps === undefined) {
      this.steps = [];
    }
    this.steps.push(newStep);
  }

  compensate(event: DomainMessage): MessageOrmEntity[] {
    const messages: MessageOrmEntity[] = [];
    for (const step of this.steps) {
      for (const msg of step.compensate(event)) {
        messages.push(msg);
      }
    }

    const newStep = new SagaStep();
    newStep.createCompensationStep(event);

    if (this.steps === undefined) {
      this.steps = [];
    }
    this.steps.push(newStep);
    return messages;
  }

  addCompleteStep(event: DomainMessage) {
    const newStep = new SagaStep();
    newStep.createCompleteStep(event);

    if (this.steps === undefined) {
      this.steps = [];
    }
    this.steps.push(newStep);
  }
}
