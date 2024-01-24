import { ReportPositionEntity } from '../domain/entities/report-position.entity';
import { AmountObjectValue } from '../domain/object-values/amount.object-value';
import { ReportEntity } from '../domain/entities/report.entity';
import { ReportOrmEntity } from './orm-entities/report.orm-entity';
import { ReportPositionOrmEntity } from './orm-entities/report-position.orm-entity';

export class BillOfLadingMapper {
  static mapToDomain(reportOrm: ReportOrmEntity): ReportEntity {
    return new ReportEntity({
      id: reportOrm.id,
      isValid: reportOrm.isValid,
      orderId: reportOrm.orderId,
      reportNumber: reportOrm.reportNumber,
      positions: reportOrm.positions.map(
        (positionOrm) =>
          new ReportPositionEntity({
            id: positionOrm.id,
            name: positionOrm.name,
            count: positionOrm.count,
            code: positionOrm.code,
            weight: positionOrm.weight,
            amount: new AmountObjectValue(positionOrm.sum, positionOrm.rate),
          }),
      ),
    });
  }
  static mapToOrm(reportEntity: ReportEntity): ReportOrmEntity {
    const reportOrmEntity = new ReportOrmEntity();
    reportOrmEntity.id = reportEntity.id;
    reportOrmEntity.isValid = reportEntity.isValid;
    reportOrmEntity.orderId = reportEntity.orderId;
    reportOrmEntity.reportNumber = reportEntity.reportNumber;
    reportOrmEntity.positions = reportEntity.positions.map((positionEntity) => {
      const positionOrmEntity = new ReportPositionOrmEntity();
      positionOrmEntity.id = positionEntity.id;
      positionOrmEntity.name = positionEntity.name;
      positionOrmEntity.count = positionEntity.count;
      positionOrmEntity.code = positionEntity.code;
      positionOrmEntity.weight = positionEntity.weight;
      return positionOrmEntity;
    });
    return reportOrmEntity;
  }
}
