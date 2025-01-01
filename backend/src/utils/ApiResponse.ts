export interface ApiResponseType {
  success?: boolean;
  data?: any;
  statusCode: number;
  message?: string;
}

export class ApiResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data?: any;
  constructor({
    data,
    statusCode = 200,
    message,
  }: ApiResponseType) {
    this.success = statusCode >= 200 && statusCode < 300;
    this.statusCode = statusCode || 200;
    this.message = message || "Success OK";
    this.data = data;
  }
}