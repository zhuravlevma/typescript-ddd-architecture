import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsOptional } from 'class-validator';
export class UpdateReportDto {
  @ApiProperty()
  @IsBoolean()
  @IsOptional()
  isValid?: boolean;
}
