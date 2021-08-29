import nc from "next-connect";
import onError from "src/components/onError";
import prisma from "src/prisma";
const handler = nc({
  onError,
});

handler.put(async (req, res) => {
  try {
    const approve = await prisma.business.update({
      where: {
        id: req.body.id,
      },
      data: {
        approved: true,
      },
    });
    console.log(approve);

    res.json("d");
  } catch (error) {
    res.json({ error: "يوجد خطأ الرجاء المحاولة لاحقا" });
  }
});

export default handler;
