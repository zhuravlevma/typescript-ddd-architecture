import { IsString, IsOptional } from 'class-validator';
import { UpdateDeliverymansInfoDto } from 'src/delivery/domain/ports/in/update-deliveryman-info.use-case';

export class UpdateDeliverymansInfoNestDto
  implements UpdateDeliverymansInfoDto
{
  @IsString()
  @IsOptional()
  firstName?: string;

  @IsString()
  @IsOptional()
  lastName?: string;

  @IsString()
  @IsOptional()
  isActive?: boolean;
}
