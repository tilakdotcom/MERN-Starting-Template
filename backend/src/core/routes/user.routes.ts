import { Router } from "express";
import { userAccessHandler, userPasswordChangeHandler, userProfileImageHandler, userResetPasswordHandler, userVerifyEmailHandler, userVerifyEmailRequestHandler } from "../controllers/user.controller";
import upload from "../../middlewares/multer.middleware";
import verifyUser from "../../middlewares/auth.middleware";

const router = Router()
router.route("/reset-password/:token").patch(userPasswordChangeHandler)
router.route("/forgot-password").post(userResetPasswordHandler)





router.use(verifyUser)

router.route("/").get(userAccessHandler)
// routes
router.route("/profile").patch(upload.single("avatar"),userProfileImageHandler)

router.route("/verify-email-request").get(userVerifyEmailRequestHandler)

router.route("/verify-email/:verificationId").patch(userVerifyEmailHandler)



export default router