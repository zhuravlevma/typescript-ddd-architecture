import { IsBoolean, IsOptional } from 'class-validator';
import { UpdateOrderStatusDto } from 'src/delivery/domain/deliveryman/ports/in/update-order-status.use-case';

export class UpdateOrderStatusNestDto implements UpdateOrderStatusDto {
  @IsBoolean()
  @IsOptional()
  delivered?: boolean;

  @IsBoolean()
  @IsOptional()
  returned?: boolean;
}
