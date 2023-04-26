import { IsBoolean, IsOptional, IsString } from 'class-validator';
import { UpdateDeliverymansOrdersDto } from 'src/delivery/domain/deliveryman/ports/in/update-deliverymans-orders.dto';

export class UpdateOrderNestDto {
  @IsBoolean()
  @IsOptional()
  isActive?: boolean;

  @IsString()
  @IsOptional()
  description: string;
}
