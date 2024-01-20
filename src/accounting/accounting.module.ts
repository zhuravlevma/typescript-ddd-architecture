import { Module } from '@nestjs/common';
import { ReportsModule } from './reports/reports.module';
import { VerificationModule } from './verification/verification.module';

@Module({
  imports: [ReportsModule, VerificationModule],
})
export class AccountingModule {}
