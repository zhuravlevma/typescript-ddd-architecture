import { IsString, IsNotEmpty } from 'class-validator';

export class AddOrderToDeliverymanNestDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;
}
