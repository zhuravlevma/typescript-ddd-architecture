import { IsString, IsOptional } from 'class-validator';

export class UpdateDeliverymansInfoDto {
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
