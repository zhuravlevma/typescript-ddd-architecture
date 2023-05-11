import { IsBoolean, IsOptional, IsString } from 'class-validator';
export class UpdateOrderNestDto {
  @IsBoolean()
  @IsOptional()
  isActive?: boolean;

  @IsString()
  @IsOptional()
  description: string;
}
