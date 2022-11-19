import COLLECTIONS from "../database/db.js";
const { SESSIONS, USERS } = COLLECTIONS;

export async function getRevenue(req, res) {
  const { authorization } = req.headers;
  const token = authorization?.replace("Bearer ", "");

  if (!token) {
    res.status(401).send({ message: "É necessário enviar um token válido" });
    return;
  }

  try {
    const { userId } = await SESSIONS.findOne({ token });
    if (!userId) {
      res.status(401);
      return;
    }

    const user = await USERS.findOne({ _id: userId });
    res.status(200).send(user);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}
