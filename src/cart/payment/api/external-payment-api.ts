import { Injectable } from '@nestjs/common';

export class CheckCurrentPositionApiDto {
  userId: string;
}

@Injectable()
export class ExternalPaymentApi {
  async pay(data: CheckCurrentPositionApiDto): Promise<boolean> {
    /// call external api
    console.log('payment', data);

    return true;
  }
}
