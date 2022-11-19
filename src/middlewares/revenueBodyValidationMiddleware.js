import expenseSchema from "../schemas/expenseSchema.js";

export async function revenueBodyValidation(req, res, next) {
  //description, value
  const revenue = req.body;

  const validation = expenseSchema.validate(revenue, {
    abortEarly: false,
  });

  if (validation.error) {
    res.status(422).send(validation.error.details.map((d) => d.message));
    return;
  }

  req.revenue = revenue;

  next();
}
