import { Injectable } from '@nestjs/common';
import axios from 'axios';

export class CheckSagaApiDto {
  correlationId: string;
}

@Injectable()
export class ExternalSagaApi {
  async createSaga(data: CheckSagaApiDto): Promise<string> {
    const res = await axios.post('localhost:3000/saga', {
      correlationId: data.correlationId,
    });

    return <string>res.data.json;
  }
}
