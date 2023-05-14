import { IsNotEmpty, IsString } from 'class-validator';
export class CreateDeliverymanNestDto {
  @IsString()
  @IsNotEmpty()
  firstName: string;
  @IsString()
  @IsNotEmpty()
  lastName: string;
}
