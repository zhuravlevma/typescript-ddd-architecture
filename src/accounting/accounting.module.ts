import { Module } from '@nestjs/common';
import { UpdateReportInteractor } from './domain/interactors/update-report.interactor';
import { UpdateReportUseCase } from './domain/ports/in/update-report.use-case';
import { FindReportByIdInteractor } from './domain/interactors/find-report-by-id.interactor';
import { FindReportByIdUseCase } from './domain/ports/in/find-report-by-id.use-case';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReportPositionOrmEntity } from 'src/accounting/dal/orm-entities/report-position.orm-entity';
import { ReportRepository } from './dal/report.repository';
import { FindReportByIdPort } from './domain/ports/out/find-report-by-id.port';
import { FindPositionByIdPort } from './domain/ports/out/find-position-by-id.port';
import { SaveReportPort } from './domain/ports/out/save-report.port';
import { ReportOrmEntity } from './dal/orm-entities/report.orm-entity';
import { CreateReportUseCase } from './domain/ports/in/create-report.use-case';
import { CreateReportInteractor } from './domain/interactors/create-report.interactor';
import { AccountingController } from './accounting.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([ReportOrmEntity, ReportPositionOrmEntity]),
  ],
  controllers: [AccountingController],
  providers: [
    {
      provide: UpdateReportUseCase,
      useFactory: (a, b) => new UpdateReportInteractor(a, b),
      inject: [FindReportByIdPort, SaveReportPort],
    },
    {
      provide: CreateReportUseCase,
      useFactory: (a) => new CreateReportInteractor(a),
      inject: [SaveReportPort],
    },
    {
      provide: FindReportByIdUseCase,
      useFactory: (a) => new FindReportByIdInteractor(a),
      inject: [FindReportByIdPort],
    },
    {
      provide: FindReportByIdPort,
      useClass: ReportRepository,
    },
    {
      provide: FindPositionByIdPort,
      useClass: ReportRepository,
    },
    {
      provide: SaveReportPort,
      useClass: ReportRepository,
    },
  ],
})
export class AccountingModule {}
