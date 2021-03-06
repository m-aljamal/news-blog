import nc from "next-connect";
import onError from "src/components/onError";
import prisma from "src/prisma";
import auth from "src/components/middleWare/auth";

const handler = nc({
  onError,
});
handler.use(auth);
handler.post(async (req, res) => {
  try {
    let {
      title,
      image,
      description,
      slug,
      topNews,
      categoryName,
      block,
      mostRead,
      important,
      slugName,
    } = req.body;
    const findCategory = await prisma.category.findMany({
      where: {
        slugName: categoryName,
      },
    });

    if (!findCategory.length) {
      let newCategory = await prisma.category.create({
        data: { name: categoryName, slugName },
      });
      categoryName = newCategory.slugName;
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
        important,
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

    return res.json(savedPost);
  } catch (error) {
    console.log(error);

    return res.status(404).json(error);
  }
});

export default handler;
