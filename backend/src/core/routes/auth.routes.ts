import { Router } from "express";
import {
  accessTokenRefresh,
  login,
  logout,
  signup,
} from "../controllers/auth.controller";
import verifyUser from "../../middlewares/auth.middleware";

const router = Router();

router.route("/register").post(signup);
router.route("/login").post(login);
router.route("/refresh").get(accessTokenRefresh);

router.use(verifyUser);
router.route("/logout").get(logout);

export default router;
