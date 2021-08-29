import auth from "src/components/middleWare/auth";
import nc from "next-connect";
import onError from "src/components/onError";
import prisma from "src/prisma";

const handler = nc({
  onError,
});
handler.use(auth);
handler.post(async (req, res) => {
  const data = req.body;
  const findLastPreview = await prisma.review.findFirst({
    where: {
      businessId: data.id,
      userName: "Mohammad Aljamal",
    },
  });
  // if (findLastPreview) {
  //   return res.status(401).json("لا يمكن اضافة تقييم اكثر من مرة");
  // }
  const review = await prisma.review.create({
    data: {
      userName: req.user.name,
      businessId: data.id,
      star: data.star,
      review: data.review,
    },
  });

  res.json(review);
});

export default handler;
