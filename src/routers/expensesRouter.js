import { Router } from "express";
import { postExpenses } from "../controllers/expensesController.js";
import { expenseBodyValidation } from "../middlewares/expenseBodyValidationMiddleware.js";
import { tokenValidation } from "../middlewares/tokenValidationMiddleware.js";

const router = Router();

router.post("/expenses", tokenValidation, expenseBodyValidation, postExpenses);

export default router;
