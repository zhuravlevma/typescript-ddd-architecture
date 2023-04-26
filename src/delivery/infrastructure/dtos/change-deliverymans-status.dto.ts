import { IsString, IsNotEmpty } from 'class-validator';

export class ChangeDeliverymansStatusNestDto {
  @IsString()
  @IsNotEmpty()
  isActive: boolean;
}
