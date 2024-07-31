import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { AddOrderToCurierDto } from './dtos/add-order-to-curier.dto';
import { UpdateCuriersInfoDto } from './dtos/update-curiers-info.dto';
import { ChangeCuriersStatusDto } from './dtos/change-curiers-status.dto';
import { CreateCurierDto } from './dtos/create-curier.dto';
import { UpdateOrderStatusDto } from './dtos/update-order-status.dto';
import { AddOrderToCurierInPort } from './domain/ports/in/add-order-to-curier.in-port';
import { ChangeCuriersStatusInPort } from './domain/ports/in/change-curiers-status.in-port';
import { CreateCurierInPort } from './domain/ports/in/create-curier.in-port';
import { FindAllCuriersInPort } from './domain/ports/in/find-all-curiers.in-port';
import { UpdateCuriersInPort } from './domain/ports/in/update-curier-info.in-port';
import { UpdateOrderInPort } from './domain/ports/in/update-order.in-port';
import { ApiTags } from '@nestjs/swagger';
import { OfferTakedEvent } from '../../board/offer/domain/events/offer-taked.event';
import { config } from 'src/config';
import { EventPattern, Payload } from '@nestjs/microservices';
import { SavedCurierResponseDto } from './dtos/response/saved-curier.response-dto';

@ApiTags('delivery')
@Controller('/delivery/curiers')
export class CurierController {
  constructor(
    private readonly createCurierInteractor: CreateCurierInPort,
    private readonly findAllCuriersQuery: FindAllCuriersInPort,
    private readonly addOrderToCurierInteractor: AddOrderToCurierInPort,
    private readonly updateCuriersInfoInteractor: UpdateCuriersInPort,
    private readonly changeCuriersStatusInteractor: ChangeCuriersStatusInPort,
    private readonly updateOrderStatusInteractor: UpdateOrderInPort,
  ) {}

  @Get('/')
  async find(): Promise<SavedCurierResponseDto[]> {
    const cureirs = await this.findAllCuriersQuery.execute();
    return cureirs.map((cur) => SavedCurierResponseDto.fromDomain(cur));
  }

  @Post('/')
  async createCurier(
    @Body() createCurierManDto: CreateCurierDto,
  ): Promise<SavedCurierResponseDto> {
    const curier =
      await this.createCurierInteractor.execute(createCurierManDto);
    return SavedCurierResponseDto.fromDomain(curier);
  }

  @Post('/:curierId/orders')
  async addOrderToCurier(
    @Param('curierId') curierId: string,
    @Body() addOrderToCurierDto: AddOrderToCurierDto,
  ): Promise<SavedCurierResponseDto> {
    const order = await this.addOrderToCurierInteractor.execute({
      curierId,
      orderId: addOrderToCurierDto.orderId,
    });
    return SavedCurierResponseDto.fromDomain(order);
  }

  @EventPattern(config().topics.offerTaked)
  applyOfferTaked(@Payload() event: OfferTakedEvent) {
    return this.addOrderToCurierInteractor.execute({
      curierId: event.payload.curierId,
      orderId: event.payload.orderId,
    });
  }

  @Patch('/:curierId')
  async updateCuriersInfo(
    @Param('curierId') curierId: string,
    @Body() updateCuriersInfoNestDto: UpdateCuriersInfoDto,
  ): Promise<SavedCurierResponseDto> {
    const curier = await this.updateCuriersInfoInteractor.execute({
      curierId,
      ...updateCuriersInfoNestDto,
    });
    return SavedCurierResponseDto.fromDomain(curier);
  }

  @Patch('/:curierId/status')
  async changeCuriersStatus(
    @Param('curierId') curierId: string,
    @Body() changeCuriersStatusDto: ChangeCuriersStatusDto,
  ): Promise<SavedCurierResponseDto> {
    const curier = await this.changeCuriersStatusInteractor.execute({
      curierId,
      ...changeCuriersStatusDto,
    });
    return SavedCurierResponseDto.fromDomain(curier);
  }

  @Patch('/:curierId/orders/:orderId')
  async updateCuriersOrderStatus(
    @Param('curierId')
    curierId: string,
    @Param('orderId')
    orderId: string,
    @Body() updateCuriersOrdersDto: UpdateOrderStatusDto,
  ): Promise<SavedCurierResponseDto> {
    const curier = await this.updateOrderStatusInteractor.execute({
      curierId,
      orderId,
      ...updateCuriersOrdersDto,
    });
    return SavedCurierResponseDto.fromDomain(curier);
  }
}
