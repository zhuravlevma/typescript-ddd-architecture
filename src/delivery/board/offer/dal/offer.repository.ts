import { DataSource, Repository } from 'typeorm';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { OfferOrmEntity } from './orm-entities/offer.orm-entity';
import { FindOfferByIdOutPort } from '../domain/ports/out/find-offer-by-id.out-port';
import { FindOfferByOrderIdOutPort } from '../domain/ports/out/find-offer-by-order-id.out-port';
import { SaveOfferOutPort } from '../domain/ports/out/save-offer.out-port';
import { OfferEntity } from '../domain/entities/offer.entity';
import { OfferMapper } from './offer.mapper';
import { FindCountOfFreeOffersOutPort as FindCountOfFreeOffersOutPort } from '../domain/ports/out/find-count-of-free-offers.out-port';
import { OutboxMapper } from '../../../../__relay__/outbox.mapper';
import { CorrelationService } from 'src/__infrastructure__/correlation/correlation.service';

@Injectable()
export class OfferRepository
  implements
    FindOfferByIdOutPort,
    FindOfferByOrderIdOutPort,
    SaveOfferOutPort,
    FindCountOfFreeOffersOutPort
{
  constructor(
    @InjectDataSource()
    private dataSource: DataSource,
    @InjectRepository(OfferOrmEntity)
    private offerRepository: Repository<OfferOrmEntity>,
    private correlationService: CorrelationService,
  ) {}

  async findCountOfFreeOffersPort(): Promise<number> {
    return this.offerRepository.count({
      where: {
        curierid: null,
      },
    });
  }

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
    const outboxORM = offer
      .pullMessages()
      .map((event) =>
        OutboxMapper.mapToORM(
          event,
          this.correlationService.getCorrelationId(),
        ),
      );
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
