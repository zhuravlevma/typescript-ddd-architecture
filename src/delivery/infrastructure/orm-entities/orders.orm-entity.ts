import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { DeliverymanOrmEntity } from './deliveryman.orm-entity';
import { BillOfLadingPositionOrmEntity } from './bill-of-lading-position.orm-entity';

@Entity('orders')
export class OrderOrmEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column({ default: true })
  isActive: boolean;

  @Column()
  deliverymanId: string;

  @ManyToOne(() => DeliverymanOrmEntity, (deliveryMan) => deliveryMan.orders)
  @JoinColumn({ name: 'deliverymanId', referencedColumnName: 'id' })
  deliveryman: DeliverymanOrmEntity;

  @OneToMany(
    () => BillOfLadingPositionOrmEntity,
    (billOfLadingElement) => billOfLadingElement.order,
    {
      cascade: ['insert', 'update'],
    },
  )
  billOfLadingPositions: BillOfLadingPositionOrmEntity[];
}
