export class ConnectionStateManager {
  private isNegotiating = false;

  setNegotiating(value: boolean) {
    this.isNegotiating = value;
  }

  isCurrentlyNegotiating() {
    return this.isNegotiating;
  }

  canNegotiate() {
    return !this.isNegotiating;
  }
}
