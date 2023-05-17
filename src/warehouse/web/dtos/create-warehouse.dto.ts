import { IsString, IsNotEmpty } from 'class-validator';

export class CreateWarehouseNestDto {
  @IsString()
  @IsNotEmpty()
  name: string;
}
