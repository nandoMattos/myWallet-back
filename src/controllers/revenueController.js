import COLLECTIONS from "../database/db.js";
const { INCOMES, EXPENSES } = COLLECTIONS;

export async function getRevenue(req, res) {
  const userId = req.userId;

  try {
    const userIncome = await INCOMES.find({ userId }).toArray();
    const userExpenses = await EXPENSES.find({ userId }).toArray();
    res.status(202).send({ expenses: userExpenses, income: userIncome });
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}
