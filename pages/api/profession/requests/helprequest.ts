import nc from "next-connect";
import onError from "src/components/onError";
import prisma from "src/prisma";

const handler = nc({
  onError,
});

handler.get(async (req, res) => {
  try {
    const requests = await prisma.businessHelpRequest.findMany({
      where: {
        hasProcessed: false,
      },
    });
    res.json(requests);
  } catch (error) {
    res.json({ error: "خطأ الرجاء المحاولة لاحقا" });
  }
});

handler.put(async (req, res) => {
  try {
    const helpRequest = await prisma.businessHelpRequest.update({
      where: {
        id: req.body.id,
      },
      data: {
        hasProcessed: true,
      },
    });
    res.json(helpRequest);
  } catch (error) {
    res.json({ error: "error" });
  }
});
export default handler;
