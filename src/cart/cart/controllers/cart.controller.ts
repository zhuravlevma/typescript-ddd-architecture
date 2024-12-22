import { Controller, Post } from '@nestjs/common';
import { ApiTags, ApiOkResponse } from '@nestjs/swagger';
import { CreateCartInPort } from '../domain/ports/in/create-cart.in-port';
import { SavedCartResponseDto } from './dtos/response/saved-cart.response-dto';
import { CorrelationService } from 'src/__infrastructure__/correlation/correlation.service';

@ApiTags('cart')
@Controller('/cart/carts')
export class CartController {
  constructor(
    private readonly createCartInteractor: CreateCartInPort,
    private readonly correlationService: CorrelationService,
  ) {}

  @ApiOkResponse({
    description: 'Saved cart',
    type: SavedCartResponseDto,
  })
  @Post('/')
  async createCart(): Promise<SavedCartResponseDto> {
    const correlationId = this.correlationService.getCorrelationId();
    const cart = await this.createCartInteractor.execute(correlationId);
    return SavedCartResponseDto.fromDomain(cart);
  }
}
