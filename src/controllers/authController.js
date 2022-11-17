import userSchema from "../schemas/userSchema.js";
import bcrypt from "bcrypt";
import { COLLECTIONS } from "../index.js";

export async function signIn(req, res) {
  const { email, password } = req.body;
}

export async function signUp(req, res) {
  //name, email, password
  const user = req.body;
  const validation = userSchema.validate(user, { abortEarly: false });

  if (validation.error) {
    res.status(422).send(validation.error.details.map((d) => d.message));
    return;
  }

  // se já existe
  try {
    const findUser = await COLLECTIONS.USERS.findOne({ email: user.email });
    if (findUser) {
      res.status(409).send({ message: "Email já registrado." });
      return;
    }
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
  //

  try {
    await COLLECTIONS.USERS.insertOne({
      ...user,
      password: bcrypt.hashSync(user.password, 10),
    });
    res.status(201).send({ message: "Usuário registrado com sucesso." });
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}
