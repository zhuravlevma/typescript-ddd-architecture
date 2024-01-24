import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateVerificationDto } from '../dtos/create-verification.dto';
import { Verification } from '../models/verification.model';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateVerificationDto } from '../dtos/update-verification.dto';
import { ExternalVerificationApi } from '../api/external-verification-api';
import { FindReportWithPositionsByIdInPort } from 'src/accounting/reports/report/domain/ports/in/find-report-with-positions-by-id.in-port';

@Injectable()
export class VerificationService {
  constructor(
    @InjectRepository(Verification)
    private readonly verificationRepository: Repository<Verification>,
    private readonly externalVerificationApi: ExternalVerificationApi,
    private readonly findReportWithPositionsByIdInPort: FindReportWithPositionsByIdInPort,
  ) {}

  async create(
    createVerificationDto: CreateVerificationDto,
  ): Promise<Verification> {
    const verification = await this.verificationRepository.save({
      orderId: createVerificationDto.orderId,
      isFull: createVerificationDto.isFull,
    });

    return verification;
  }

  async update(
    updateVerificationDto: UpdateVerificationDto,
  ): Promise<Verification> {
    const verification = await this.verificationRepository.findOne({
      where: {
        id: updateVerificationDto.id,
      },
    });

    const report = await this.findReportWithPositionsByIdInPort.execute({
      id: 'string',
    });

    if (verification === null) {
      throw new BadRequestException(
        `Verification with id ${updateVerificationDto.id} not found`,
      );
    }

    if (updateVerificationDto.isFull) {
      this.externalVerificationApi.fullVerifyReport({
        id: report.id,
        reportNumber: report.reportNumber,
      });
    }

    return verification;
  }
}
