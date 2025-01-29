import appAssert from "../../common/API/AppAssert";
import { BAD_REQUEST } from "../../constants/http";
import asyncHandler from "../../middlewares/asyncHandler.middleware";
import { validateFileImage } from "../../middlewares/file.middleware";
import { userAvatarService } from "../services/user.service";

export const userProfileImageHandle = asyncHandler(async (req, res) => {
  const userId = req.userId 
  appAssert(req.file,BAD_REQUEST ,"avatar not found", )
  const {path} = validateFileImage(req.file as Express.Multer.File)


  await userAvatarService({
    avatar:path,
    userId: userId as string
  })

});
