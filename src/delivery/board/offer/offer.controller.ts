import { Body, Controller, Param, Patch } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { UpdateOfferDto } from './dtos/update-offer.dto';
import { UpdateOfferInPort } from './domain/ports/in/update-offer.in-port';
import { OfferEntity } from './domain/entities/offer.entity';
import { OnEvent } from '@nestjs/event-emitter';
import { CreateOfferInPort } from './domain/ports/in/create-offer.in-port';
import { ReportValidatedEvent } from '../../../accounting/reports/report/domain/events/report-validated.event';

@ApiTags('delivery')
@Controller('/delivery/offers')
export class OfferController {
  constructor(
    private readonly updateOfferUseCase: UpdateOfferInPort,
    private readonly createOfferUseCase: CreateOfferInPort,
  ) {}

  @OnEvent('report-validated') // env fixed
  handleReportValidatedEvent(event: ReportValidatedEvent) {
    return this.createOfferUseCase.execute({
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
  ): Promise<OfferEntity> {
    return this.updateOfferUseCase.execute({
      offerId,
      deliverymanId: updateOfferDto.deliverymanId,
    });
  }
}
