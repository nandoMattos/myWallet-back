import COLLECTIONS from "../database/db.js";
const { SESSIONS } = COLLECTIONS;

export async function tokenValidation(req, res, next) {
  const { authorization } = req.headers;
  const token = authorization?.replace("Bearer ", "");

  if (!token) {
    res.status(401).send({ message: "É necessário enviar um token válido." });
    return;
  }

  try {
    const user = await SESSIONS.findOne({ token });
    if (!user) {
      res.status(401).send({ message: "Usuário não logado." });
      return;
    }

    req.userId = user._id;

    next();
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}
