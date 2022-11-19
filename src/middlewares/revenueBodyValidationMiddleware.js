import expenseSchema from "../schemas/expenseSchema.js";

export async function revenueBodyValidation(req, res, next) {
  //description, value
  const expenseOrIncome = req.body;

  const validation = expenseSchema.validate(expenseOrIncome, {
    abortEarly: false,
  });

  if (validation.error) {
    res.status(422).send(validation.error.details.map((d) => d.message));
    return;
  }

  req.expenseOrIncome = expenseOrIncome;

  next();
}
