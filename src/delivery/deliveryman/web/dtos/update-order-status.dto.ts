import { IsBoolean, IsOptional } from 'class-validator';
export class UpdateOrderStatusNestDto {
  @IsBoolean()
  @IsOptional()
  delivered?: boolean;

  @IsBoolean()
  @IsOptional()
  returned?: boolean;
}
