import { IsString } from 'class-validator';

export class CreateVerificationDto {
  @IsString()
  orderId: string;

  @IsString()
  isFull: boolean;

  @IsString()
  description: string;
}
