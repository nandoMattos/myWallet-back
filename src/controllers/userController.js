import { COLLECTIONS } from "../index.js";

export async function getRevenue(req, res) {
  const { authorization } = req.headers;
  const token = authorization?.replace("Bearer ", "");

  if (!token) {
    res.status(401).send("É necessário enviar um token válido");
    return;
  }

  try {
    const { userId } = await COLLECTIONS.SESSIONS.findOne({ token });
    if (!userId) {
      res.status(401);
      return;
    }

    const user = await COLLECTIONS.USERS.findOne({ _id: userId });
    res.status(200).send(user);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}
