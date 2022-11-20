import { ObjectId } from "mongodb";
import COLLECTIONS from "../database/db.js";
const { REVENUE } = COLLECTIONS;

export async function getRevenue(req, res) {
  const userId = req.userId;

  try {
    const userRevenue = await REVENUE.find({ userId }).toArray();
    res.status(202).send({ userRevenue });
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}

export async function deleteRevenueItem(req, res) {
  const userId = req.userId;
  const { id } = req.params;

  try {
    await REVENUE.deleteOne({ _id: ObjectId(id) });
    res.sendStatus(200);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}
