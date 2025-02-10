import { Router } from "express";
import verifyUser from "../../middlewares/auth.middleware";
import {
  deleteSessionsHandler,
  getSessionsHandler,
} from "../controllers/session.controller";

const router = Router();

router.use(verifyUser);

router.route("/").get(getSessionsHandler);

router.route("/:id").delete(deleteSessionsHandler);

export default router;
