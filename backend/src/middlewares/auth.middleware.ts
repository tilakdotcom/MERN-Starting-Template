import { NextFunction, Request, Response } from "express";
import asyncHandler from "./asyncHandler.middleware";
import { UNAUTHORIZED } from "../constants/http";
import ApiErrorCode from "../constants/apiErrorCode";
import { verifyToken } from "../common/utils/jwtHelper";
import { userDocument } from "../database/models/user.model";
import appAssert from "../common/API/AppAssert";
import { SessionDocument } from "../database/models/session.model";

const verifyUser = asyncHandler(
  async (req: Request, _res: Response, next: NextFunction) => {
    try {
      const token =
        req.cookies.accessToken ||
        (req.header("Authorization")?.replace("Bearer ", "") as string);

      // validate token
      appAssert(
        token,
        UNAUTHORIZED,
        "Not authorized, token is required ",
        ApiErrorCode.INVALID_ACCCESS_TOKEN
      );

      //token decode
      const decoded = verifyToken({ token });
      appAssert(
        decoded,
        UNAUTHORIZED,
        "Not authorized, token is invalid ",
        ApiErrorCode.INVALID_ACCCESS_TOKEN
      );

      req.userId = decoded.userId;
      req.sessionId = decoded.sessionId;
      next();
    } catch (error) {
      console.log("Error in Middleware", error);
      next(error);
    }
  }
);

export default verifyUser;
declare global {
  namespace Express {
    interface Request {
      userId?: userDocument["_id"];
      sessionId? : SessionDocument["_id"]
    }
  }
}
