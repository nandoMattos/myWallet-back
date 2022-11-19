import { Router } from "express";
import {
  getExpenses,
  postExpenses,
} from "../controllers/expensesController.js";

const router = Router();

router.get("/expenses", getExpenses);
router.post("/expenses", postExpenses);

export default router;
