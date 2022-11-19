import express from "express";
import cors from "cors";
import authRouter from "./routers/authRouter.js";
import userRouter from "./routers/revenueRouter.js";
import expensesRouter from "./routers/expensesRouter.js";

const app = express();
app.use(express.json());
app.use(cors());
app.use(authRouter);
app.use(userRouter);
app.use(expensesRouter);

app.listen(5000);
