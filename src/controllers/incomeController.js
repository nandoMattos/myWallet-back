import COLLECTIONS from "../database/db.js";
const { INCOMES } = COLLECTIONS;

export async function postIncome(req, res) {
  const userId = req.userId;
  const { description, value } = req.expenseOrIncome;

  try {
    await INCOMES.insertOne({ userId, description, value });
    res.sendStatus(201);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}
