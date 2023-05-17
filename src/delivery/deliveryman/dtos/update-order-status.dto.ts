import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsOptional } from 'class-validator';

export class UpdateOrderStatusNestDto {
  @ApiProperty()
  @IsBoolean()
  @IsOptional()
  delivered?: boolean;

  @ApiProperty()
  @IsBoolean()
  @IsOptional()
  returned?: boolean;
}
