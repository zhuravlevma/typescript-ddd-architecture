import { FindCountOfFreeDeliverymans } from '../../../deliveryman/domain/ports/out/find-count-of-free-deliverymans.port';
import { FindCountOfFreeOffersPort } from '../../../offer/domain/ports/out/find-count-of-free-offers.port';
import { GetShareOffersToFreeDeliverymansUseCase } from '../ports/in/get-share-offers-to-free-deliverymans.use-case';

export class GetShareOffersToFreeDeliverymansInteractor
  implements GetShareOffersToFreeDeliverymansUseCase
{
  constructor(
    private readonly findCoundOfFreeOffersPort: FindCountOfFreeOffersPort,
    private readonly findCountOfFreeDeliverymans: FindCountOfFreeDeliverymans,
  ) {}

  async execute(): Promise<number> {
    const countDeliverymans =
      await this.findCoundOfFreeOffersPort.findCountOfFreeOffersPort();
    const countOffers =
      await this.findCountOfFreeDeliverymans.findCountOfFreeDeliverymans();

    console.log(countOffers, countDeliverymans);
    if (countOffers === 0 || countDeliverymans === 0) return 0;
    return countOffers / countDeliverymans;
  }
}
