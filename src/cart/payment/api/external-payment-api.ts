import { Injectable, Logger } from '@nestjs/common';

export class CheckCurrentPositionApiDto {
  userId: string;
}

@Injectable()
export class ExternalPaymentApi {
  private readonly logger = new Logger(ExternalPaymentApi.name);

  async pay(data: CheckCurrentPositionApiDto): Promise<boolean> {
    /// call external api
    this.logger.debug('payment', data);

    return true;
  }
}
