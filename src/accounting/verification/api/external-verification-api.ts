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

  async fullVerifyReport(report: ReportApiDto) {
    /// call external api
    return report;
  }

  async signReport(reportNumber: number) {
    /// call external api
    return reportNumber;
  }

  async complete(reportNumber: number) {
    /// call external api
    return reportNumber;
  }
}
