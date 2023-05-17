import { IsNotEmpty, IsBoolean } from 'class-validator';

export class UpdateOrderStatusNestDto {
  @IsBoolean()
  @IsNotEmpty()
  isValid: boolean;
}
