import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('outbox')
export class OutboxOrmEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  type: string;

  @Column()
  reason: string;

  @Column({
    type: 'jsonb',
    default: {},
  })
  payload: any;

  @Column({ default: false })
  publushed: boolean;
}
