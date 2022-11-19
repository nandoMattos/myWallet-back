import { Router } from "express";
import { signIn, signUp } from "../controllers/authController.js";
import { signInBodyValidation } from "../middlewares/signInBodyValidationMiddleware.js";
import { signUpBodyValidation } from "../middlewares/signUpBodyValidationMiddleware.js";

const router = Router();

router.post("/sign-in", signInBodyValidation, signIn);
router.post("/sign-up", signUpBodyValidation, signUp);

export default router;
