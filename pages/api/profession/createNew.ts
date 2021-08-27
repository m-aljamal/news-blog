import prisma from "src/prisma";
import nc from "next-connect";
import onError from "src/components/onError";

const handler = nc({
  onError,
});

handler.post(async (req, res) => {
  const addProfession = await prisma.business.create({
    data: req.body,
  });

  res.json(addProfession);
});

export default handler;
