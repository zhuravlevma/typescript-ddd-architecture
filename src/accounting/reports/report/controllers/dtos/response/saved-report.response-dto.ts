import { ReportEntity } from '../../domain/entities/report.entity';

export class SavedReportResponseDto {
  id: string;
  isValid: boolean;
  orderId: string;
  reportNumber: number;
  positions: SavedReportPositionResponseDto[];

  static fromDomain(reportEntity: ReportEntity): SavedReportResponseDto {
    const respDto = new SavedReportResponseDto();
    const reportReadonly = reportEntity.export();
    respDto.id = reportReadonly.id;
    respDto.isValid = reportReadonly.isValid;
    respDto.orderId = reportReadonly.orderId;
    respDto.reportNumber = reportReadonly.reportNumber;
    respDto.positions = reportReadonly.positions.map((positionEntity) => {
      const positionDto = new SavedReportPositionResponseDto();
      const positionReadonly = positionEntity.export();
      const amountReadonly = positionReadonly.amount.export();
      positionDto.id = positionReadonly.id;
      positionDto.name = positionReadonly.name;
      positionDto.count = positionReadonly.count;
      positionDto.code = positionReadonly.code;
      positionDto.weight = positionReadonly.weight;
      positionDto.isValid = positionReadonly.isValid;
      positionDto.amount = amountReadonly.amount;
      positionDto.rate = amountReadonly.rate;
      return positionDto;
    });
    return respDto;
  }
}

class SavedReportPositionResponseDto {
  id: string;
  name: string;
  count: number;
  code: number;
  weight: number;
  isValid: boolean;
  amount: number;
  rate: number;
}
