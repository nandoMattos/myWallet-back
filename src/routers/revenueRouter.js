import { Router } from "express";
import {
  deleteRevenueItem,
  getRevenue,
} from "../controllers/revenueController.js";
import { tokenValidation } from "../middlewares/tokenValidationMiddleware.js";

const router = Router();

router.get("/revenue", tokenValidation, getRevenue);
router.delete("/revenue/:id", tokenValidation, deleteRevenueItem);

export default router;
