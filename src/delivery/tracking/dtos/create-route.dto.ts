import { IsNumber, IsString } from 'class-validator';

export class CreateRouteDto {
  @IsString()
  courierId: string;

  @IsNumber()
  orderId: string;
}
