import expenseSchema from "../schemas/expenseSchema.js";

export async function expenseBodyValidation(req, res, next) {
  //description, value
  const expense = req.body;

  const validation = expenseSchema.validate(expense, { abortEarly: false });

  if (validation.error) {
    res.status(422).send(validation.error.details.map((d) => d.message));
    return;
  }

  req.expense = expense;

  next();
}
