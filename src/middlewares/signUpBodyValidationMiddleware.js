import COLLECTIONS from "../database/db.js";
import { signUpSchema } from "../schemas/authSchema.js";
const { USERS } = COLLECTIONS;

export async function signUpBodyValidation(req, res, next) {
  //name, email, password
  const userInput = req.body;
  const validation = signUpSchema.validate(userInput, { abortEarly: false });

  if (validation.error) {
    res.status(422).send(validation.error.details.map((d) => d.message));
    return;
  }

  try {
    const findUser = await USERS.findOne({ email: userInput.email });
    if (findUser) {
      res.status(409).send({ message: "Email já registrado." });
      return;
    }

    req.user = userInput;
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }

  next();
}
