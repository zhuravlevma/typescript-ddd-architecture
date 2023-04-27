import { IsOptional, IsString } from 'class-validator';
import { UpdateDeliverymansOrdersDto } from 'src/delivery/domain/deliveryman/ports/in/update-deliverymans-orders.dto';

export class UpdateDeliverymansOrdersNestDto
  implements UpdateDeliverymansOrdersDto
{
  @IsString()
  @IsOptional()
  description?: string;
}