import express from "express";
import cors from "cors";
import authRouter from "./routers/authRouter.js";
import revenueRouter from "./routers/revenueRouter.js";
import expensesRouter from "./routers/expensesRouter.js";
import incomesRouter from "./routers/incomeRouter.js";

const app = express();
app.use(express.json());
app.use(cors());
app.use(authRouter);
app.use(revenueRouter);
app.use(expensesRouter);
app.use(incomesRouter);

app.listen(5000);
