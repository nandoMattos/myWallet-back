import { v4 as uuidV4 } from "uuid";
import bcrypt from "bcrypt";
import COLLECTIONS from "../database/db.js";
const { USERS, SESSIONS } = COLLECTIONS;

export async function signIn(req, res) {
  const { name, userId } = req.user;
  const token = uuidV4();
  try {
    await SESSIONS.updateOne({ userId }, { $set: { token } }, { upsert: true });
    res.status(200).send({ token, name });
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}

export async function signUp(req, res) {
  const user = req.user;
  try {
    await USERS.insertOne({
      ...user,
      password: bcrypt.hashSync(user.password, 10),
    });
    res.status(201).send({ message: "Usuário registrado com sucesso." });
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}
