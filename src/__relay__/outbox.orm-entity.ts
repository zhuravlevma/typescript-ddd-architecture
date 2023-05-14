import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('outbox')
export class OutboxOrmEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  domainId: string;

  @Column()
  type: string;

  @Column()
  reason: string;

  @Column({ default: false })
  publushed: boolean;
}
