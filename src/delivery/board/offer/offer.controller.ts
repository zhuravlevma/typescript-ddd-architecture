import { Body, Controller, Param, Patch } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { UpdateOfferDto } from './dtos/update-offer.dto';
import { UpdateOfferInPort } from './domain/ports/in/update-offer.in-port';
import { CreateOfferInPort } from './domain/ports/in/create-offer.in-port';
import { ReportValidatedEvent } from '../../../accounting/reports/report/domain/events/report-validated.event';
import { config } from 'src/config';
import { EventPattern, Payload } from '@nestjs/microservices';
import { SavedOfferResponseDto } from './dtos/response/saved-offer.response-dto';

@ApiTags('delivery')
@Controller('/delivery/offers')
export class OfferController {
  constructor(
    private readonly updateOfferInteractor: UpdateOfferInPort,
    private readonly createOfferInteractor: CreateOfferInPort,
  ) {}

  @EventPattern(config().topics.reportValidated)
  applyReportValidated(@Payload() event: ReportValidatedEvent) {
    return this.createOfferInteractor.execute({
      orderId: event.payload.orderId,
      name: 'Report with ' + event.payload.orderId,
    });
  }

  @ApiOkResponse({
    description: 'Saved offer with orders',
  })
  @Patch('/:offerId')
  async updateOrderStatus(
    @Param('offerId') offerId: string,
    @Body() updateOfferDto: UpdateOfferDto,
  ): Promise<SavedOfferResponseDto> {
    const offer = await this.updateOfferInteractor.execute({
      offerId,
      curierId: updateOfferDto.curierId,
    });
    return SavedOfferResponseDto.fromDomain(offer);
  }
}
