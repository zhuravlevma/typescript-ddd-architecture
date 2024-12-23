import { DataSource, Repository } from 'typeorm';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { SaveCartOutPort } from '../domain/ports/out/save-cart.out-port';
import { Injectable } from '@nestjs/common';
import { GetCartOutPort } from '../domain/ports/out/get-cart.out-port';
import { CorrelationService } from 'src/__infrastructure__/correlation/correlation.service';
import { CartOrmEntity } from './orm-entities/cart.orm-entity';
import { OutboxMapper } from 'src/__relay__/outbox.mapper';
import { CartEntity } from '../domain/entities/cart.entity';
import { CartMapper } from './cart.mapper';

@Injectable()
export class CartRepository implements SaveCartOutPort, GetCartOutPort {
  constructor(
    @InjectDataSource()
    private readonly dataSource: DataSource,
    @InjectRepository(CartOrmEntity)
    private readonly cartRepository: Repository<CartOrmEntity>,
    private readonly correlationService: CorrelationService,
  ) {}

  async saveCart(cart: CartEntity): Promise<CartEntity> {
    const cartORM = CartMapper.mapToORM(cart);
    const outboxORM = cart
      .pullMessages()
      .map((event: any) =>
        OutboxMapper.mapToORM(
          event,
          this.correlationService.getCorrelationId(),
        ),
      );
    const savedCartOrm = await this.dataSource.transaction(
      async (transactionalEntityManager) => {
        await transactionalEntityManager.save(outboxORM);
        return await transactionalEntityManager.save(cartORM);
      },
    );
    return CartMapper.mapToDomain(savedCartOrm);
  }
  async getCart(cartId: string): Promise<CartEntity> {
    const cartOrm = await this.cartRepository.findOne({
      where: {
        id: cartId,
      },
      relations: {
        positions: true,
      },
    });
    return CartMapper.mapToDomain(cartOrm);
  }
}
