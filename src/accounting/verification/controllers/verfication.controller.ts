import { Body, Controller, Patch, Post } from '@nestjs/common';
import { CreateVerificationDto } from '../dtos/create-verification.dto';
import { VerificationService } from '../services/verification.service';
import { UpdateVerificationDto } from '../dtos/update-verification.dto';

@Controller('/verification')
export class VerificationController {
  constructor(private readonly veriicationService: VerificationService) {}
  @Post()
  createVerification(@Body() createVerificationDto: CreateVerificationDto) {
    return this.veriicationService.create(createVerificationDto);
  }

  @Patch()
  updateVerification(@Body() updateVerificationDto: UpdateVerificationDto) {
    return this.veriicationService.update(updateVerificationDto);
  }
}
