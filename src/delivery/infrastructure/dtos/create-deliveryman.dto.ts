import { IsNotEmpty, IsString } from 'class-validator';
import { CreateDeliverymanDto } from 'src/delivery/domain/ports/in/create-deliveryman.use-case';

export class CreateDeliverymanNestDto implements CreateDeliverymanDto {
  @IsString()
  @IsNotEmpty()
  firstName: string;
  @IsString()
  @IsNotEmpty()
  lastName: string;
}
