import nc from "next-connect";
import onError from "src/components/onError";
import { prisma } from "src/prisma";

const handler = nc({
  onError,
});

handler.post(async (req, res) => {
  const user = await prisma.user.create(JSON.parse(req.body));
  res.json(user);
});

export default handler;
