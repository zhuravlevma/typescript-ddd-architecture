import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class UpdateVerificationDto {
  @IsString()
  id: string;

  @IsBoolean()
  @IsOptional()
  isFull?: boolean;

  @IsBoolean()
  @IsOptional()
  completed?: boolean;

  @IsBoolean()
  @IsOptional()
  signed?: boolean;
}
