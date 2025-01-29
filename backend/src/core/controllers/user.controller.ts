import appAssert from "../../common/API/AppAssert";
import { emailSchema } from "../../common/schemas/auth";
import { BAD_REQUEST, OK } from "../../constants/http";
import User from "../../database/models/user.model";
import asyncHandler from "../../middlewares/asyncHandler.middleware";
import { validateFileImage } from "../../middlewares/file.middleware";
import {
  userAvatarService,
  userPasswordResetRequestService,
} from "../services/user.service";

export const userProfileImageHandle = asyncHandler(async (req, res) => {
  const userId = req.userId;
  appAssert(req.file, BAD_REQUEST, "avatar not found");
  const { path } = validateFileImage(req.file as Express.Multer.File);

  const { user } = await userAvatarService({
    avatar: path,
    userId: userId as string,
  });

  return res.status(OK).json({
    message: "Avatar successfully uploaded ",
    user,
  });
});

export const userResetPasswordRequest = asyncHandler(async (req, res) => {
  const email = emailSchema.parse(req.body.email);

  await userPasswordResetRequestService({ email });

  return res.status(OK).json({
    message: "Password reset email sent successfully ",
  });
});

