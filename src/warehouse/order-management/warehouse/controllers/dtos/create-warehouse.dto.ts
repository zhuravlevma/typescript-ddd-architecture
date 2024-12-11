import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class CreateWarehouseDto {
  @ApiProperty({ type: 'string' })
  @IsString()
  @IsNotEmpty()
  name: string;
}
