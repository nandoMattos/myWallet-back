import bcrypt from "bcrypt";
import { signInSchema } from "../schemas/authSchema.js";
import COLLECTIONS from "../database/db.js";
const { USERS } = COLLECTIONS;

export async function signInBodyValidation(req, res, next) {
  const { email, password: inputedPassoword } = req.body;

  const validation = signInSchema.validate(
    { email, password: inputedPassoword },
    { abortEarly: false }
  );

  if (validation.error) {
    res.status(422).send(validation.error.details.map((d) => d.message));
    return;
  }

  try {
    const registeredUser = await USERS.findOne({ email });
    if (!registeredUser) {
      res.status(404).send({ message: "Email não cadastrado." });
      return;
    }
    if (!bcrypt.compareSync(inputedPassoword, registeredUser.password)) {
      res.status(401).send({ message: "Senha inválida." });
      return;
    }

    req.user = { name: registeredUser.name, userId: registeredUser._id };

    next();
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}
