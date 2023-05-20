import { DataSource, Repository } from 'typeorm';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { OutboxMapper } from 'src/__relay__/outbox.mapper';
import { OfferOrmEntity } from './orm-entities/offer.orm-entity';
import { FindOfferByIdPort } from '../domain/ports/out/find-offer-by-id.port';
import { FindOfferByOrderIdPort } from '../domain/ports/out/find-offer-by-order-id.port';
import { SaveOfferPort } from '../domain/ports/out/save-offer.port';
import { OfferEntity } from '../domain/entities/offer.entity';
import { OfferMapper } from './offer.mapper';

@Injectable()
export class OfferRepository
  implements FindOfferByIdPort, FindOfferByOrderIdPort, SaveOfferPort
{
  constructor(
    @InjectDataSource()
    private dataSource: DataSource,
    @InjectRepository(OfferOrmEntity)
    private offerRepository: Repository<OfferOrmEntity>,
  ) {}

  async findOfferByIdPort(offerId: string): Promise<OfferEntity> {
    const [offer] = await this.offerRepository.find({
      where: {
        id: offerId,
      },
    });
    return OfferMapper.mapToDomain(offer);
  }

  async findOfferByOrderIdPort(orderId: string): Promise<OfferEntity> {
    const [offer] = await this.offerRepository.find({
      where: {
        orderId: orderId,
      },
    });
    return OfferMapper.mapToDomain(offer);
  }

  async saveOffer(offer: OfferEntity): Promise<OfferEntity> {
    const outboxORM = offer.events.map((event) => OutboxMapper.mapToORM(event));
    const reportOrm = OfferMapper.mapToOrm(offer);

    const savedOffer = await this.dataSource.transaction(
      async (transactionalEntityManager) => {
        await transactionalEntityManager.save(outboxORM);
        return await transactionalEntityManager.save(reportOrm);
      },
    );
    return OfferMapper.mapToDomain(savedOffer);
  }
}
