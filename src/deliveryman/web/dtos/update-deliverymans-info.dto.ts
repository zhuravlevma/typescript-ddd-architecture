import { IsString, IsOptional } from 'class-validator';
export class UpdateDeliverymansInfoNestDto {
  @IsString()
  @IsOptional()
  firstName?: string;

  @IsString()
  @IsOptional()
  lastName?: string;

  @IsString()
  @IsOptional()
  isActive?: boolean;
}
