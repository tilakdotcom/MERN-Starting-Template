import { Router } from "express";
import { userPasswordChangeHandler, userProfileImageHandler, userResetPasswordHandler } from "../controllers/user.controller";
import upload from "../../middlewares/multer.middleware";
import verifyUser from "../../middlewares/auth.middleware";

const router = Router()





router.route("/forgot-password").get(userResetPasswordHandler)

router.use(verifyUser)
// routes
router.route("/profile").patch(upload.single("avatar"),userProfileImageHandler)

router.route("/reset-password/:token").get(userPasswordChangeHandler)



export default router