import express from "express";
import { MongoClient } from "mongodb";
import cors from "cors";
import dotenv from "dotenv";
import { signIn, signUp } from "./controllers/authController.js";
import { getRevenue } from "./controllers/userController.js";
dotenv.config();

const mongoClient = new MongoClient(process.env.MONGO_URI);
await mongoClient.connect();

const db = mongoClient.db("myWallet");

export const COLLECTIONS = {
  USERS: db.collection("users"),
  SESSIONS: db.collection("sessions"),
  EXPENSES: db.collection("expenses"),
  INCOMES: db.collection("incomes"),
};

const app = express();
app.use(express.json());
app.use(cors());

// Auth routes
app.post("/sign-in", signIn);
app.post("/sign-up", signUp);

//
app.get("/revenue", getRevenue);

app.listen(5000);
