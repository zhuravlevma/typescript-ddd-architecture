import { Module } from '@nestjs/common';
import { ReportsModule } from '../reports/reports.module';

@Module({
  imports: [ReportsModule],
})
export class VerificationModule {}
