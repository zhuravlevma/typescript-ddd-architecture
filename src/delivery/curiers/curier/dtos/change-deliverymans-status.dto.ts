import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class ChangeDeliverymansStatusDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  isActive: boolean;
}
