import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
} from 'typeorm';
import { SagaStep } from './saga-step.model';

@Entity('compensations')
export class Compensation {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => SagaStep, (step) => step.compensations)
  @JoinColumn({ name: 'sagaStepId' })
  sagaStep: SagaStep;

  @Column()
  compensationType: string; // Например, CancelReservation, RefundMoney

  @Column()
  status: string; // Pending, Completed, Failed

  @CreateDateColumn()
  startedAt: Date;

  @UpdateDateColumn()
  completedAt: Date;

  @Column({ nullable: true })
  errorMessage: string;

  @Column({ type: 'jsonb', nullable: true })
  metadata: Record<string, any>;
}
