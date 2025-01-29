import { Router } from "express";
import { healthCheck } from "../controllers/health.controller";


const router = Router()


// routes
router.route("/").get(healthCheck)




export default router