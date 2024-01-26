import { IsNumber, IsString } from 'class-validator';

export class UpdateRouteDto {
  @IsString()
  id: string;

  @IsString()
  courierId?: string;

  @IsNumber()
  orderId?: string;
}
