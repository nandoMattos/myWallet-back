import { Router } from "express";
import { getRevenue } from "../controllers/userController.js";

const router = Router();

router.get("/revenue", getRevenue);

export default router;
