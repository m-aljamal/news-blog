import nc from "next-connect";
import onError from "src/components/onError";
import prisma from "src/prisma";
const handler = nc({
  onError,
});

handler.post(async (req, res) => {
  try {
    const request = await prisma.businessHelpRequest.create({
      data: req.body,
    });

    res.json(request);
  } catch (error) {
    res.json("يوجد خطأ الرجاء المحاولة لاحقا");
  }
});

export default handler;
