import { Injectable, Logger } from '@nestjs/common';

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
  private readonly logger = new Logger(ExternalTrackingApi.name);

  async checkLastCoordinates(
    data: CheckCurrentPositionApiDto,
  ): Promise<CheckCurrentPositionApiResponseDto> {
    /// call external api
    this.logger.debug(data);

    return {
      startLatitude: null,
      startLongitude: null,
      endLatitude: null,
      endLongitude: null,
    };
  }
}
