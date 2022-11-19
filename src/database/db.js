import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const mongoClient = new MongoClient(process.env.MONGO_URI);
await mongoClient.connect();

const db = mongoClient.db("myWallet");

const COLLECTIONS = {
  USERS: db.collection("users"),
  SESSIONS: db.collection("sessions"),
  EXPENSES: db.collection("expenses"),
  INCOMES: db.collection("incomes"),
};

export default COLLECTIONS;
