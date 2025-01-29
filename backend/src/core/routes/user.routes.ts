import { Router } from "express";
import { userProfileImageHandle } from "../controllers/user.controller";
import upload from "../../middlewares/multer.middleware";

const router = Router()


// routes
router.route("/profile").patch(upload.single("avatar"),userProfileImageHandle)




export default router