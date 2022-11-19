import joi from "joi";

const expenseSchema = joi.object({
  description: joi.string().max(100).required(),
  value: joi.number().required(),
});

export default expenseSchema;
