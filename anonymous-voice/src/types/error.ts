export class APIError extends Error {
  constructor(
    message: string,
    public status: number,
    public code: string,
  ) {
    super(message);
    this.name = "APIError";
    Object.setPrototypeOf(this, APIError.prototype);
  }
}

export class MediaDeviceError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "MediaDeviceError";
  }
}
