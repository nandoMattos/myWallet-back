import COLLECTIONS from "../database/db.js";
const { EXPENSES } = COLLECTIONS;

export async function postExpenses(req, res) {
  const expense = req.expense;
  const userId = req.userId;
  try {
    await EXPENSES.insertOne({ userId, ...expense });
    res.sendStatus(201);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}
