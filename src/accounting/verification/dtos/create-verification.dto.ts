import { IsNumber, IsString } from 'class-validator';

export class CreateVerificationDto {
  @IsString()
  reportId: string;

  @IsNumber()
  reportNumber: number;

  @IsString()
  isFull: boolean;

  @IsString()
  description: string;
}
