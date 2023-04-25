import { IsOptional, IsString } from 'class-validator';

export class UpdateDeliverymansOrdersDto {
  @IsString()
  @IsOptional()
  description?: string;
}
