import nc from "next-connect";
import onError from "src/components/onError";
import prisma from "src/prisma";
const handler = nc({
  onError,
});

handler.get(async (req, res) => {
  try {
    const businessType = await prisma.business.groupBy({
      by: ["businessType", "country"],
      where: {
        approved: true,
      },
    });
    const countries = await prisma.business.groupBy({
      by: ["country"],
      where: {
        approved: true,
      },
    });

    res.json({ businessType, countries });
  } catch (error) {
    res.json({ error: "يوجد خطأ الرجاء اعادة المحاولة" });
  }
});

export default handler;
