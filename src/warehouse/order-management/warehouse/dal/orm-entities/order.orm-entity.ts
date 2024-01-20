import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { WarehouseOrmEntity } from './warehouse.orm-entity';

@Entity('orders', {
  schema: 'warehouse',
})
export class OrderOrmEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ type: 'bool' })
  isValid: boolean;

  @Column({ type: 'uuid' })
  warehouseId: string;

  @ManyToOne(() => WarehouseOrmEntity, (warehouse) => warehouse.orders)
  @JoinColumn({ name: 'warehouseId', referencedColumnName: 'id' })
  warehouse: WarehouseOrmEntity;
}
