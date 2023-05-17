import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class ChangeDeliverymansStatusNestDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  isActive: boolean;
}
