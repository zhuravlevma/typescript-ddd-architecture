import { IsString, IsNotEmpty, IsBoolean } from 'class-validator';

export class AddOrderNestDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  orderId: string;

  @IsBoolean()
  @IsNotEmpty()
  isValid: boolean;
}
