import dayjs from "dayjs";
import COLLECTIONS from "../database/db.js";
const { REVENUE } = COLLECTIONS;

export async function postExpenses(req, res) {
  const { description, value } = req.revenue;
  const userId = req.userId;
  try {
    await REVENUE.insertOne({
      userId,
      description,
      value,
      type: "expense",
      date: dayjs().format("DD/MM"),
    });
    res.sendStatus(201);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}
