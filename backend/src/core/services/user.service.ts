import User from "../../database/models/user.model";
import appAssert from "../../common/API/AppAssert";
import { BAD_REQUEST, INTERNAL_SERVER_ERROR } from "../../constants/http";
import uploadFileToCloudinary from "../../common/utils/cloudinary";
import VerifyCation from "../../database/models/vaerifiacation.model";
import { verificationCode } from "../../common/enum/verificationCode";
import { fifteenMinuteFromNow, Now } from "../../common/utils/customTime";
import { passwordHasher } from "../../common/utils/bcryptjs";
import Session from "../../database/models/session.model";

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
    expiresAt: fifteenMinuteFromNow(),
  });
  // TODO sent email verification
  return { passwordResetVerificationCode };
};

type UserPasswordChangeServiceType = {
  newPassword: string;
  passwordResetToken: string;
};

export const userPasswordChangeService = async (
  data: UserPasswordChangeServiceType
) => {
  const verification = await VerifyCation.findOne({
    _id: data.passwordResetToken,
    type: verificationCode.PASSWORD_RESET,
    expiresAt: {
      $gte: Now(),
    },
  });
  appAssert(verification, BAD_REQUEST, "reset password has expired");

  const user = await User.findOne({ _id: verification.userId });
  appAssert(user, INTERNAL_SERVER_ERROR, "reset password failed");

  const hashedPassword = await passwordHasher(data.newPassword);

  user.password = hashedPassword;
  await user.save({ validateBeforeSave: false });

  //delete old sessions
  await Session.deleteMany({ userId: user._id });

  return { user };
};
