import { Router } from "express";
import { getRevenue } from "../controllers/revenueController.js";
import { tokenValidation } from "../middlewares/tokenValidationMiddleware.js";

const router = Router();

router.get("/revenue", tokenValidation, getRevenue);

export default router;
