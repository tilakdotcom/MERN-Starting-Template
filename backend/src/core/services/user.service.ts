import mongoose from "mongoose";
import User from "../../database/models/user.model";
import appAssert from "../../common/API/AppAssert";
import { BAD_REQUEST } from "../../constants/http";
import uploadFileToCloudinary from "../../common/utils/cloudinary";

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


type UserPasswordChangeServiceType = {
  userId: string;
  newPassword: string;
  passwordResetToken: string;
};

export const userPasswordChangeService = async () => {};
