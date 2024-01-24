import { Body, Controller, Post } from '@nestjs/common';
import { CreateVerificationDto } from '../dtos/create-verification';

@Controller('/verification')
export class VerificationController {
  @Post()
  verificationOrder(@Body() createVerificationDto: CreateVerificationDto) {
    return createVerificationDto;
  }
}
