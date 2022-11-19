import joi from "joi";

const expenseSchema = joi.object({
  description: joi.string().max(100).required(),
  value: joi.string().required(),
});

export default expenseSchema;
