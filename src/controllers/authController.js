import userSchema from "../schemas/userSchema.js";
import bcrypt from "bcrypt";
import { COLLECTIONS } from "../index.js";
import { v4 as uuidV4 } from "uuid";

export async function signIn(req, res) {
  const { email, password } = req.body;

  try {
    const user = await COLLECTIONS.USERS.findOne({ email });
    if (!user) {
      res.status(404).send({ message: "Email não cadastrado." });
      return;
    }

    if (!bcrypt.compareSync(password, user.password)) {
      res.status(401).send({ message: "Senha inválida." });
      return;
    }

    const session = await COLLECTIONS.SESSIONS.findOne({ userId: user._id });
    if (session) {
      res.status(409).send({ message: "Usuário já logado." });
      return;
    }

    const token = uuidV4();
    await COLLECTIONS.SESSIONS.insertOne({ userId: user._id, token });
    res.status(200).send(token);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}

export async function signUp(req, res) {
  //name, email, password
  const user = req.body;
  const validation = userSchema.validate(user, { abortEarly: false });

  if (validation.error) {
    res.status(422).send(validation.error.details.map((d) => d.message));
    return;
  }

  try {
    const findUser = await COLLECTIONS.USERS.findOne({ email: user.email });
    if (findUser) {
      res.status(409).send({ message: "Email já registrado." });
      return;
    }

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
