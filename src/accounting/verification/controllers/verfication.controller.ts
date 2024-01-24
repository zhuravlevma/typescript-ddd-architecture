import { Body, Controller, Post } from '@nestjs/common';
import { CreateVerificationDto } from '../dtos/create-verification.dto';

@Controller('/verification')
export class VerificationController {
  @Post()
  verificationOrder(@Body() createVerificationDto: CreateVerificationDto) {
    return createVerificationDto;
  }
}
