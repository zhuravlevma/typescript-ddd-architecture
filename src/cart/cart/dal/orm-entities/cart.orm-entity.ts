import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { CartPositionOrmEntity } from './cart-position.orm-entity';

@Entity('cart', {
  schema: 'cart',
})
export class CartOrmEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid', { nullable: true })
  orderId: string | null;

  @Column({ default: false })
  isActive: boolean;

  @OneToMany(() => CartPositionOrmEntity, (order) => order.cart, {
    cascade: ['insert', 'update'],
  })
  positions: CartPositionOrmEntity[];
}
