import { BillOfLadingPositionOrmEntity } from 'src/accounting-order/dal/orm-entities/bill-of-lading-position.orm-entity';
import { BillOfLadingPositionEntity } from '../domain/entities/bill-of-lading-position-accounting.entity';
import { SumObjectValue } from '../domain/object-values/sum.object-value';
import { BillOfLadingReportEntity } from '../domain/entities/bill-of-lading-report.entity';
import { BillOfLadingReportOrmEntity } from './orm-entities/bill-of-lading-report.orm-entity';

export class BillOfLadingMapper {
  static mapToDomain(
    reportOrm: BillOfLadingReportOrmEntity,
  ): BillOfLadingReportEntity {
    return new BillOfLadingReportEntity({
      id: reportOrm.id,
      isValid: reportOrm.isValid,
      positions: reportOrm.positions.map(
        (positionOrm) =>
          new BillOfLadingPositionEntity({
            id: positionOrm.id,
            name: positionOrm.name,
            count: positionOrm.count,
            code: positionOrm.code,
            weight: positionOrm.weight,
            orderId: positionOrm.orderId,
            amount: positionOrm.amount,
            sum: new SumObjectValue(positionOrm.sum, positionOrm.rate),
          }),
      ),
    });
  }
  static mapToOrm(
    reportEntity: BillOfLadingReportEntity,
  ): BillOfLadingReportOrmEntity {
    const reportOrmEntity = new BillOfLadingReportOrmEntity();
    reportOrmEntity.id = reportEntity.id;
    reportOrmEntity.isValid = reportEntity.isValid;
    reportOrmEntity.positions = reportEntity.positions.map((positionEntity) => {
      const positionOrmEntity = new BillOfLadingPositionOrmEntity();
      positionOrmEntity.id = positionEntity.id;
      positionOrmEntity.name = positionEntity.name;
      positionOrmEntity.count = positionEntity.count;
      positionOrmEntity.code = positionEntity.code;
      positionOrmEntity.weight = positionEntity.weight;
      positionOrmEntity.orderId = positionEntity.orderId;
      positionOrmEntity.amount = positionEntity.amount;
      return positionOrmEntity;
    });
    return reportOrmEntity;
  }
}
