import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { SagaStep } from './saga-step.model';

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
}
