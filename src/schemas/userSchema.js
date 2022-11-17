import joi from "joi";

const userSchema = joi.object({
  name: joi.string().required().min(3).max(150),
  email: joi
    .string()
    .email({ tlds: { allow: false } })
    .required(),
  password: joi.string().required().min(5),
});

export default userSchema;
