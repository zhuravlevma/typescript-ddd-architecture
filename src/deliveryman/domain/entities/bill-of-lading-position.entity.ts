export class BillOfLadingPositionEntity {
  id: string;
  isValid: boolean;

  constructor(id: string, isValid: boolean) {
    this.id = id;
    this.isValid = isValid;
  }

  positionIsValid() {
    return this.isValid;
  }
}
