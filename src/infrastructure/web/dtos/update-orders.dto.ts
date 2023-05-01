import { IsBoolean, IsOptional, IsString } from 'class-validator';
import { UpdateOrderDto } from 'src/accounting-order/ports/in/update-order.use-case';

export class UpdateOrderNestDto implements UpdateOrderDto {
  @IsBoolean()
  @IsOptional()
  isActive?: boolean;

  @IsString()
  @IsOptional()
  description: string;
}
