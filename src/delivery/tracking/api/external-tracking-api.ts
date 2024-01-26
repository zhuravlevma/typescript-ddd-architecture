import { Injectable } from '@nestjs/common';

export class CheckCurrentPositionApiDto {
  entityId: string;
}

export class CheckCurrentPositionApiResponseDto {
  startLatitude: string | null;
  startLongitude: string | null;
  endLatitude: string | null;
  endLongitude: string | null;
}

@Injectable()
export class ExternalTrackingApi {
  async checkLastCoordinates(
    data: CheckCurrentPositionApiDto,
  ): Promise<CheckCurrentPositionApiResponseDto> {
    /// call external api
    console.log(data);

    return {
      startLatitude: null,
      startLongitude: null,
      endLatitude: null,
      endLongitude: null,
    };
  }
}
