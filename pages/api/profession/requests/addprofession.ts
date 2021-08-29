import nc from "next-connect";
import onError from "src/components/onError";
import prisma from "src/prisma";
const handler = nc({
  onError,
});

handler.get(async (req, res) => {
  try {
    const reqests = await prisma.business.findMany({
      where: {
        approved: false,
      },
      select: {
        name: true,
        businessName: true,
        id: true,
      },
    });

    res.json(reqests);
  } catch (error) {
    res.json({ error: "error" });
  }
});

export default handler;
