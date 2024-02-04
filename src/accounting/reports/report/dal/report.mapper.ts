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
            isValid: positionOrm.isValid,
            amount: new AmountObjectValue({
              amount: positionOrm.sum,
              rate: positionOrm.rate,
            }),
          }),
      ),
    });
  }
  static mapToOrm(reportEntity: ReportEntity): ReportOrmEntity {
    const reportRadonly = reportEntity.export();
    const reportOrmEntity = new ReportOrmEntity();
    reportOrmEntity.id = reportRadonly.id;
    reportOrmEntity.isValid = reportRadonly.isValid;
    reportOrmEntity.orderId = reportRadonly.orderId;
    reportOrmEntity.reportNumber = reportRadonly.reportNumber;
    reportOrmEntity.positions = reportRadonly.positions.map(
      (positionEntity) => {
        const positionReadonly = positionEntity.export();
        const positionOrmEntity = new ReportPositionOrmEntity();
        positionOrmEntity.id = positionReadonly.id;
        positionOrmEntity.name = positionReadonly.name;
        positionOrmEntity.count = positionReadonly.count;
        positionOrmEntity.code = positionReadonly.code;
        positionOrmEntity.weight = positionReadonly.weight;
        positionOrmEntity.isValid = positionReadonly.isValid;

        const amountReadonly = positionReadonly.amount.export();
        positionOrmEntity.sum = amountReadonly.amount;
        positionOrmEntity.rate = amountReadonly.rate;
        return positionOrmEntity;
      },
    );
    return reportOrmEntity;
  }
}
