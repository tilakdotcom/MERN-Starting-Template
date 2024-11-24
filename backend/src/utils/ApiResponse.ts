export interface ApiResponseType {
  statusCode: number;
  data?: any;
  success?: boolean;
  message: string;
}
export class ApiResponse {
  statusCode?: number;
  data?: any;
  success?: boolean;
  message: string;
  constructor({ statusCode, data, success = true, message }: ApiResponseType) {
     this.success = statusCode >= 200 && statusCode <= 300;
    this.statusCode = statusCode || 200;
    this.data = data;
    this.message = message || "successFully OK";
  }
}
