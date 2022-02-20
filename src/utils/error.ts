export default class AppError extends Error {
  constructor(
    public status: number = 500,
    public message: string,
    public details = {}
  ) {
    super(message);
    this.status = status;
    this.name = 'AppError';
    this.details = details;
  }
}
