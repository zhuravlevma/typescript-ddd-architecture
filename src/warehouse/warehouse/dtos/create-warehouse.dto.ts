import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class CreateWarehouseNestDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;
}
