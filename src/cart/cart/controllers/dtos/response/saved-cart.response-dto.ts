import { ApiProperty } from '@nestjs/swagger';
import { CartEntity } from 'src/cart/cart/domain/entities/cart.entity';

class SavedCartPositionResponseDto {
  @ApiProperty()
  id: string;
  @ApiProperty()
  code: number;
  @ApiProperty()
  sum: number;
}

export class SavedCartResponseDto {
  @ApiProperty({ description: 'uuid', format: 'uuid' })
  id: string;

  @ApiProperty()
  orderId: string;

  @ApiProperty({ type: [SavedCartPositionResponseDto] })
  positions: SavedCartPositionResponseDto[];

  static fromDomain(cartEntity: CartEntity): SavedCartResponseDto {
    const respDto = new SavedCartResponseDto();
    const cartReadonly = cartEntity.export();
    respDto.id = cartReadonly.id;
    respDto.orderId = cartReadonly.orderId;
    respDto.positions = cartReadonly.positions.map((positionEntity) => {
      const positionDto = new SavedCartPositionResponseDto();
      const orderReadonly = positionEntity.export();
      positionDto.id = orderReadonly.id;
      positionDto.code = orderReadonly.code;
      positionDto.sum = orderReadonly.sum;
      return positionDto;
    });
    return respDto;
  }
}
