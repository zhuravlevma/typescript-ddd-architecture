import { Module } from '@nestjs/common';
import { ReportsModule } from '../reports/reports.module';
import { Verification } from './models/verification.model';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VerificationController } from './controllers/verfication.controller';
import { VerificationService } from './services/verification.service';
import { ExternalVerificationApi } from './api/external-verification-api';

@Module({
  imports: [ReportsModule, TypeOrmModule.forFeature([Verification])],
  controllers: [VerificationController],
  providers: [VerificationService, ExternalVerificationApi],
})
export class VerificationModule {}
