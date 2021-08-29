import prisma from "src/prisma";
import nc from "next-connect";
import onError from "src/components/onError";

const handler = nc({
  onError,
});

handler.get(async (req, res) => {
  try {
    const reviews = await prisma.business.findUnique({
      where: {
        id: req.query.id,
      },
      select: {
        reviews: true,
      },
    });
    res.json(reviews);
  } catch (error) {
    res.json({ error: "يوجد خطأ الرجاء اعادة المحاولة" });
  }
});

export default handler;
