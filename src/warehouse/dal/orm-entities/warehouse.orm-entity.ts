import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { OrderOrmEntity } from './order.orm-entity';

@Entity('warehouse', {
  schema: 'warehouse',
})
export class WarehouseOrmEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @OneToMany(() => OrderOrmEntity, (order) => order.warehouse, {
    cascade: ['insert', 'update'],
  })
  orders: OrderOrmEntity[];
}
