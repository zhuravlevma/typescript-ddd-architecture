import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class ChangeCuriersStatusDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  isActive: boolean;
}
