import { Injectable } from '@nestjs/common';
import axios from 'axios';
import {
  CheckSagaApiDto,
  CreateSagaOutPort,
} from '../domain/ports/out/create-saga.out-port';

@Injectable()
export class ExternalSagaApi implements CreateSagaOutPort {
  async createSaga(data: CheckSagaApiDto): Promise<string> {
    const res = await axios.post('http://127.0.0.1:3000/saga', {
      correlationId: data.correlationId,
    });

    return <string>res.data;
  }
}
