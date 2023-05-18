import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsOptional } from 'class-validator';
export class UpdateReportNestDto {
  @ApiProperty()
  @IsBoolean()
  @IsOptional()
  isValid?: boolean;
}
