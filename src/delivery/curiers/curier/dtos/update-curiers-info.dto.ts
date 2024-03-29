import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';
export class UpdateCuriersInfoDto {
  @ApiProperty()
  @IsString()
  @IsOptional()
  firstName?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  lastName?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  isActive?: boolean;
}
