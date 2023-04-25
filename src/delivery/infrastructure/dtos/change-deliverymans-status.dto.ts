import { IsString, IsNotEmpty } from 'class-validator';

export class ChangeDeliverymansStatusDto {
  @IsString()
  @IsNotEmpty()
  isActive: boolean;
}
