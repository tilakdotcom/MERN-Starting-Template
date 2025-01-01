import { Router } from "express";
import health from "../controllers/health.controller";

const router = Router();

router.route("/health").get(health)



export default router



