import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { GetShareOffersToFreeDeliverymansUseCase } from './domain/ports/in/get-share-offers-to-free-deliverymans.use-case';

@ApiTags('delivery')
@Controller('/delivery')
export class GeneralController {
  constructor(
    private readonly getShareOffersToFreeDeliverymansUseCase: GetShareOffersToFreeDeliverymansUseCase,
  ) {}

  @ApiOkResponse({
    description: 'Share of offers to free deliverymans',
  })
  @Get('/share')
  async updateOrderStatus(): Promise<number> {
    return this.getShareOffersToFreeDeliverymansUseCase.execute();
  }
}
