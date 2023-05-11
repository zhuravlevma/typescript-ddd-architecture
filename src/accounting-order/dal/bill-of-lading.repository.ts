import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { BillOfLadingMapper } from './bill-of-lading.mapper';
import { FindReportByIdPort } from '../domain/ports/out/find-report-by-id.port';
import { SaveReportPort } from '../domain/ports/out/save-report.port';
import { BillOfLadingReportEntity } from '../domain/entities/bill-of-lading-report.entity';
import { BillOfLadingReportOrmEntity } from './orm-entities/bill-of-lading-report.orm-entity';

@Injectable()
export class BillOfLadingRepository
  implements FindReportByIdPort, SaveReportPort
{
  constructor(
    @InjectRepository(BillOfLadingReportOrmEntity)
    private billOfLadingReportRepository: Repository<BillOfLadingReportOrmEntity>,
  ) {}
  async findReportById(reportId: string): Promise<BillOfLadingReportEntity> {
    const [order] = await this.billOfLadingReportRepository.find({
      where: { id: reportId },
    });
    return BillOfLadingMapper.mapToDomain(order);
  }

  async save(
    report: BillOfLadingReportEntity,
  ): Promise<BillOfLadingReportEntity> {
    const reportOrm = BillOfLadingMapper.mapToOrm(report);
    const savedReport = await this.billOfLadingReportRepository.save(reportOrm);
    return BillOfLadingMapper.mapToDomain(savedReport);
  }
}
