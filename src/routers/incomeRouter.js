import { Router } from "express";
import { postIncome } from "../controllers/incomeController.js";
import { revenueBodyValidation } from "../middlewares/revenueBodyValidationMiddleware.js";
import { tokenValidation } from "../middlewares/tokenValidationMiddleware.js";

const router = Router();

router.post("/incomes", tokenValidation, revenueBodyValidation, postIncome);

export default router;
