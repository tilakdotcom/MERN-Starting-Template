import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import { INTERNAL_SERVER_ERROR, NOT_FOUND } from "../../constants/http";
import ApiError from "../API/ApiError";
import appAssert from "../API/AppAssert";
import {
  CLOUDINARY_API_KEY,
  CLOUDINARY_API_NAME,
  CLOUDINARY_API_SECRET,
} from "../../constants/getEnv";

// Configuration
cloudinary.config({
  cloud_name: CLOUDINARY_API_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
});

//upload image to cloudinary
const uploadFileToCloudinary = async (localPath: string) => {
  appAssert(localPath, NOT_FOUND, "File Path is not found");
  try {
    const uploadResult = await cloudinary.uploader.upload(localPath, {
      folder: "saas",
      quality: "auto:good",
      resource_type: "auto",
    });

    //validation
    appAssert(
      uploadResult.secure_url,
      INTERNAL_SERVER_ERROR,
      "Failed to upload image to Cloudinary!"
    );
    return uploadResult;
  } catch (error) {
    throw new ApiError(
      INTERNAL_SERVER_ERROR,
      "Failed to upload image to Cloudinary"
    );
  } finally {
    fs.unlinkSync(localPath);
  }
};

export default uploadFileToCloudinary;
