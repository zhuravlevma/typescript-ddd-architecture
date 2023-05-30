import { Body, Controller, Param, Patch } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { UpdateOfferDto } from './dtos/update-offer.dto';
import { UpdateOfferUseCase } from './domain/ports/in/update-offer.interactor';
import { OfferEntity } from './domain/entities/offer.entity';
import { OnEvent } from '@nestjs/event-emitter';
import { CreateOfferUseCase } from './domain/ports/in/create-offer.use-case';
import { ReportValidatedEvent } from '../../accounting/report/domain/events/report-validated.event';

@ApiTags('delivery')
@Controller('/delivery/offers')
export class OfferController {
  constructor(
    private readonly updateOfferUseCase: UpdateOfferUseCase,
    private readonly createOfferUseCase: CreateOfferUseCase,
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
