import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity('outbox')
export class MessageOrmEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'text', name: 'message_type' })
  messageType: string;

  @Column({ type: 'text' })
  reason: string;

  @Column({
    type: 'jsonb',
    default: {},
  })
  payload: any;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  created_at: Date;

  @Column({ type: 'bool', default: false })
  published: boolean;

  @Column({ type: 'text', name: 'message_name' })
  messageName: string;

  @Column({ type: 'text', name: 'aggregate_id' })
  aggregateId: string;

  @Column({ type: 'text', name: 'aggregate_name' })
  aggregateName: string;

  @Column({ type: 'text', name: 'context_name' })
  contextName: string;

  @Column({ type: 'text', name: 'correlation_id' })
  correlationId: string;

  @Column({ type: 'jsonb', default: {}, name: 'compensation_event' })
  compensationEvent: any;
}
