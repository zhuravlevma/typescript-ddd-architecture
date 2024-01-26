import { IsString } from 'class-validator';

export class UpdateDeliveryDto {
  @IsString()
  id: string;

  @IsString()
  orderId?: string;

  @IsString()
  truckId?: string;

  @IsString()
  targetPickUpPoint?: string;
}
