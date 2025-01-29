import mongoose from "mongoose";
import User from "../../database/models/user.model";
import appAssert from "../../common/API/AppAssert";
import { BAD_REQUEST } from "../../constants/http";
import uploadFileToCloudinary from "../../common/utils/cloudinary";
import VerifyCation from "../../database/models/vaerifiacation.model";
import { verificationCode } from "../../common/enum/verificationCode";

type UserAvatar = {
  avatar: string;
  userId: string;
};

export const userAvatarService = async (data: UserAvatar) => {
  const user = await User.findOne({ _id: data.userId });
  appAssert(user, BAD_REQUEST, "user not found");
  const avatar = await uploadFileToCloudinary(data.avatar);

  user.avatar = avatar.secure_url;
  await user.save({ validateBeforeSave: false });

  return { user };
};

type UserPasswordResetRequestType = {
  email: string;
};

export const userPasswordResetRequestService = async (
  data: UserPasswordResetRequestType
) => {
  const user = await User.findOne({ email: data.email });
  appAssert(user, BAD_REQUEST, "user not found");

  const passwordResetVerificationCode = await VerifyCation.create({
    userId: user._id,
    type: verificationCode.PASSWORD_RESET,
  });
  // TODO sent email verification
  return { passwordResetVerificationCode };
};

type UserPasswordChangeServiceType = {
  userId: string;
  newPassword: string;
  passwordResetToken: string;
};

export const userPasswordChangeService = async () => {};
