import ApiErrorCode from "../../constants/apiErrorCode";
import { HttpStatusCode } from "../../constants/http";

class ApiError extends Error {
  constructor(
    public statusCode: HttpStatusCode,
    public message: string,
    public errorCode?: ApiErrorCode
  ) {
    super(message);
  }
}


export default ApiError;   