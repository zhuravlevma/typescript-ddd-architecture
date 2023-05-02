import { IsString, IsNotEmpty } from 'class-validator';
import { ChangeDeliverymansStatusDto } from 'src/domain/deliveryman/ports/in/change-deliverymans-status.use-case';

export class ChangeDeliverymansStatusNestDto
  implements ChangeDeliverymansStatusDto
{
  @IsString()
  @IsNotEmpty()
  isActive: boolean;
}
