import appAssert from "../../common/API/AppAssert";
import { loginSchema, registerSchema } from "../../common/schemas/auth";
import {
  clearAuthCookie,
  setAccessTokenCookie,
  setAuthCookies,
} from "../../common/utils/cookie";
import { BAD_REQUEST, CREATED, OK, UNAUTHORIZED } from "../../constants/http";
import Session from "../../database/models/session.model";
import asyncHandler from "../../middlewares/asyncHandler.middleware";
import {
  createUserService,
  loginUserService,
  refreshTokenService,
} from "../services/auth.service";

//signup
export const signup = asyncHandler(async (req, res) => {
  const body = registerSchema.parse(req.body);
  //using services
  const { user } = await createUserService(body);

  res.status(CREATED).json({
    message: "user created successfully",
    data: user,
  });
});

//login
export const login = asyncHandler(async (req, res) => {
  const userAgent = req.headers["user-agent"]
  const body = loginSchema.parse({
    ...req.body,
    userAgent: userAgent,
  });

  const { accessToken, refreshToken, user } = await loginUserService(body);

  const cooki = setAuthCookies({ res, accessToken, refreshToken });

  return cooki.status(OK).json({
    message: "Logged in successfully",
    data: user,
  });
});

//logout
export const logout = asyncHandler(async (req, res) => {
  const sessionId = req.sessionId;

  const session = await Session.deleteOne({
    _id: sessionId,
  });

  appAssert(session, BAD_REQUEST, "session not found  in the database");

  return clearAuthCookie(res).status(OK).json({
    message: "Logged out successfully",
  });
});

export const accessTokenRefresh = asyncHandler(async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  appAssert(refreshToken, UNAUTHORIZED, "Refresh token  not found");
  // userId
  const { accessToken } = await refreshTokenService(refreshToken);
  return setAccessTokenCookie({ res, accessToken }).status(OK).json({
    message: "Access token refreshed successfully",
  });
});