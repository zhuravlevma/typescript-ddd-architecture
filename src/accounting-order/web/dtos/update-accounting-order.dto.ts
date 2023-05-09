import { IsOptional, IsString } from 'class-validator';
import { UpdateAccountingOrderDto } from 'src/accounting-order/domain/services/update-order.service';

export class UpdateAccountingOrderNestDto implements UpdateAccountingOrderDto {
  @IsString()
  @IsOptional()
  description: string;
}
