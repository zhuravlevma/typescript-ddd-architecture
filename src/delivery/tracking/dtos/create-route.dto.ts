import { IsString } from 'class-validator';

export class CreateRouteDto {
  @IsString()
  courierId: string;

  @IsString()
  orderId: string;
}
