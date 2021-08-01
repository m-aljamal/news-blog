import nc from "next-connect";
import onError from "src/components/onError";
import prisma from "src/prisma";
import auth from "src/components/middleWare/auth";

const handler = nc({
  onError,
});
handler.use(auth);
handler.post(async (req, res) => {
  const postData = JSON.parse(req.body);

  let {
    title,
    image,
    description,
    slug,
    topNews,
    categoryName,
    block,
    mostRead,
  } = postData;
  const findCategory = await prisma.category.findMany({
    where: {
      name: categoryName,
    },
  });

  if (!findCategory.length) {
    let newCategory = await prisma.category.create({
      data: { name: categoryName },
    });
    categoryName = newCategory.name;
  }

  const savedPost = await prisma.post.create({
    data: {
      title,
      image,
      description,
      slug,
      topNews,
      categoryName,
      mostRead,
      userName: req.user.name,
      block: {
        create: {
          time: block.time,
          version: block.version,
          blocks: block.blocks,
        },
      },
    },
  });
  res.json(savedPost);
});

export default handler;
