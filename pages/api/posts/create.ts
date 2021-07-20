import nc from "next-connect";
import onError from "src/components/onError";
import { prisma } from "src/prisma";
const handler = nc({
  onError,
});

handler.post(async (req, res) => {
  const postData = JSON.parse(req.body);
  console.log(postData);

  let { title, image, description, slug, topNews, categoryName, block } =
    postData;
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
      // block,
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
