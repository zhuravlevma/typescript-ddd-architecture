import { Injectable } from '@nestjs/common';

export class ReportApiDto {
  id: string;
  reportNumber: number;
}

@Injectable()
export class ExternalVerificationApi {
  simpleVerifyReport(report: ReportApiDto) {
    /// call external api
    return report;
  }

  fullVerifyReport(report: ReportApiDto) {
    /// call external api
    return report;
  }

  signReport(report: number) {
    /// call external api
    return report;
  }
}
