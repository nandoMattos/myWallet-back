import { Router } from "express";
import { postExpenses } from "../controllers/expensesController.js";
import { revenueBodyValidation } from "../middlewares/revenueBodyValidationMiddleware.js";
import { tokenValidation } from "../middlewares/tokenValidationMiddleware.js";

const router = Router();

router.post("/expenses", tokenValidation, revenueBodyValidation, postExpenses);

export default router;
