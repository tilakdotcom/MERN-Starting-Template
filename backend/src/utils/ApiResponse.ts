export interface ApiResponseType {
  statusCode: number;
  data: any;
  success: boolean;
  message: string;
}
export class ApiResponse {
  statusCode?: number;
  data?: any;
  success?: boolean;
  message: string;
  constructor({ statusCode, data, success = true, message }: ApiResponseType) {
    this.statusCode = statusCode || 200;
    this.data = data;
    this.success = success;
    this.message = message || "successFully OK";
  }
}
