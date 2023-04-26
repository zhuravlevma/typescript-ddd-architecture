import { IsOptional, IsString } from 'class-validator';

export class UpdateDeliverymansOrdersNestDto {
  @IsString()
  @IsOptional()
  description?: string;
}
