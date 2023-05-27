import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('offers', { schema: 'delivery' })
export class OfferOrmEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  orderId: string;

  @Column({ type: 'uuid', nullable: true })
  deliverymanId: string | null;
}
