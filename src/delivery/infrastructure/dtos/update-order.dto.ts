import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class UpdateOrderDto {
  @IsBoolean()
  @IsOptional()
  isActive?: boolean;

  @IsString()
  @IsOptional()
  description: string;
}
