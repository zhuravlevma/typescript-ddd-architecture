import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('offers', { schema: 'delivery' })
export class OfferOrmEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  orderId: string;

  @Column()
  vehicleType: string;

  @Column()
  preferredDeliveryAreas: string;

  @Column()
  workingHours: string;

  @Column()
  weight: number;

  @Column()
  bid: number;

  @Column({ type: 'uuid', nullable: true })
  curierid: string | null;
}
