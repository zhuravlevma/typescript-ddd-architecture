import { FindCountOfFreeDeliverymansOutPort } from '../../../deliveryman/domain/ports/out/find-count-of-free-deliverymans.out-port';
import { FindCountOfFreeOffersOutPort } from '../../../offer/domain/ports/out/find-count-of-free-offers.out-port';
import { GetShareOffersToFreeDeliverymansInPort } from '../ports/in/get-share-offers-to-free-deliverymans.in-port';

export class GetShareOffersToFreeDeliverymansInteractor
  implements GetShareOffersToFreeDeliverymansInPort
{
  constructor(
    private readonly findCoundOfFreeOffersPort: FindCountOfFreeOffersOutPort,
    private readonly findCountOfFreeDeliverymans: FindCountOfFreeDeliverymansOutPort,
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
