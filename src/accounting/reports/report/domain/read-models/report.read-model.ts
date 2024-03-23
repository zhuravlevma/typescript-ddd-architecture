interface ReportReadModelAttributes {
  id: string;
  isValid: boolean;
  orderId: string;
  reportNumber: number;
  positions: ReportPositionReadModel[];
}

export class ReportReadModel implements ReportReadModelAttributes {
  readonly id: string;
  readonly isValid: boolean;
  readonly orderId: string;
  readonly reportNumber: number;
  readonly positions: ReportPositionReadModel[];

  constructor(attributes: ReportReadModelAttributes) {
    this.id = attributes.id;
    this.isValid = attributes.isValid;
    this.orderId = attributes.orderId;
    this.reportNumber = attributes.reportNumber;
    this.positions = attributes.positions;
  }
}

interface ReportPositionReadModelAttributes {
  id: string;
  name: string;
  count: number;
  code: number;
  weight: number;
  amount: number;
  rate: number;
}

export class ReportPositionReadModel implements ReportPositionReadModelAttributes {
  readonly id: string;
  readonly name: string;
  readonly count: number;
  readonly code: number;
  readonly weight: number;
  readonly amount: number;
  readonly rate: number;

  constructor(attributes: ReportPositionReadModelAttributes) {
    this.id = attributes.id;
    this.name = attributes.name;
    this.code = attributes.code;
    this.weight = attributes.weight;
    this.amount = attributes.amount;
    this.rate = attributes.rate;
  }
}
