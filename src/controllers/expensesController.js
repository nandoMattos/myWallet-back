import expenseSchema from "../schemas/expenseSchema.js";
import COLLECTIONS from "../database/db.js";
const { SESSIONS, EXPENSES } = COLLECTIONS;
export async function getExpenses(req, res) {
  const { authorization } = req.headers;
  const token = authorization?.replace("Bearer ", "");

  if (!token) {
    res.status(401).send({ message: "É necessário enviar um token válido" });
    return;
  }

  try {
    const { userId } = await COLLECTIONS.SESSIONS.findOne({ token });
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}

export async function postExpenses(req, res) {
  //description, value
  const expense = req.body;
  const { authorization } = req.headers;
  const token = authorization?.replace("Bearer ", "");

  if (!token) {
    res.status(401).send({ message: "É necessário enviar um token válido" });
    return;
  }

  const validation = expenseSchema.validate(expense, { abortEarly: false });

  if (validation.error) {
    res.status(422).send(validation.error.details.map((d) => d.message));
    return;
  }

  try {
    const user = await SESSIONS.findOne({ token });
    if (!user) {
      res.status(401).send({ message: "É necessário enviar um token válido" });
      return;
    }
    await EXPENSES.insertOne({ userId: user._id, ...expense });
    res.sendStatus(201);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}
