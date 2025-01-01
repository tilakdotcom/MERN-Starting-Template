export class ApiError extends Error {
  statusCode: number;
  error: any[];
  data: any | null;
  success: boolean;
  stack?: string | undefined;

  constructor(
    statusCode = 500,
    message = "An unexpected Error occured",
    data: any | null = null,
    error = [],
    success: boolean = false,
    stack?: string | undefined
  ) {
    super(message);
    this.success = success || false;
    this.statusCode = statusCode;
    this.message = message;
    this.data = data;
    this.error = error;
    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}