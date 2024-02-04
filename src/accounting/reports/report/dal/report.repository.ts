import { DataSource, Repository } from 'typeorm';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { BillOfLadingMapper as ReportMapper } from './report.mapper';
import { FindReportByIdOutPort } from '../domain/ports/out/find-report-by-id.out-port';
import { SaveReportOutPort } from '../domain/ports/out/save-report.out-port';
import { ReportEntity } from '../domain/entities/report.entity';
import { ReportOrmEntity } from './orm-entities/report.orm-entity';
import { OutboxMapper } from '../../../../__relay__/outbox.mapper';
import {
  FindReportWithPositionsByOutPort,
  FindReportWithPositionsParams,
} from '../domain/ports/out/find-report-with-positions-by-id.out-port';
import { ReportReadModel } from '../domain/read-models/verification.read-model';

@Injectable()
export class ReportRepository
  implements
    FindReportByIdOutPort,
    SaveReportOutPort,
    FindReportWithPositionsByOutPort
{
  constructor(
    @InjectDataSource()
    private dataSource: DataSource,
    @InjectRepository(ReportOrmEntity)
    private reportRepository: Repository<ReportOrmEntity>,
  ) {}
  async findReportById(reportId: string): Promise<ReportEntity> {
    const [order] = await this.reportRepository.find({
      where: { id: reportId },
      relations: {
        positions: true,
      },
    });
    return ReportMapper.mapToDomain(order);
  }

  async save(report: ReportEntity): Promise<ReportEntity> {
    const outboxORM = report
      .pullMessages()
      .map((event) => OutboxMapper.mapToORM(event));
    const reportOrm = ReportMapper.mapToOrm(report);

    const savedReport = await this.dataSource.transaction(
      async (transactionalEntityManager) => {
        await transactionalEntityManager.save(outboxORM);
        return await transactionalEntityManager.save(reportOrm);
      },
    );
    return ReportMapper.mapToDomain(savedReport);
  }

  async findReportWithPositionsByOutInPort(
    findReportByIdQuery: FindReportWithPositionsParams,
  ): Promise<ReportReadModel> {
    const data = await this.reportRepository.findOne({
      where: { id: findReportByIdQuery.id },
      relations: {
        positions: true,
      },
    });

    if (data === null) {
      throw new Error('Report not found');
    }

    return new ReportReadModel({
      id: data.id,
      isValid: data.isValid,
      orderId: data.orderId,
      reportNumber: data.reportNumber,
      positions: data.positions.map((position) => ({
        id: position.id,
        name: position.name,
        count: position.count,
        code: position.code,
        weight: position.weight,
        amount: position.sum,
        rate: position.rate,
      })),
    });
  }
}
