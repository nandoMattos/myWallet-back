import { express } from "express";
import { MongoClient } from "mongodb";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

const mongoClient = new MongoClient(process.env.URI_MONGO);
await mongoClient.connect();

const db = mongoClient.db("myWallet");

const collections = {
  users: db.collection("users"),
  sessions: db.collection("sessions"),
  expenses: db.collection("expenses"),
  incomes: db.collection("incomes"),
};

const app = express();
app.use(express.json());
app.use(cors());
