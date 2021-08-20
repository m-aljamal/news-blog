import nc from "next-connect";
import auth from "src/components/middleWare/auth";
import onError from "src/components/onError";
import prisma from "src/prisma";
const handler = nc({
  onError,
});

handler.use(auth);

handler.put(async (req, res) => {
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
  } = req.body;

  try {
    const post = await prisma.post.update({
      where: {
        id: req.body.id,
      },
      data: {
        title,
        image,
        description,
        slug,
        topNews: topNews || false,
        categoryName,
        mostRead: mostRead || false,
        important: important || false,
        userName: req.user.name,
        block: {
          update: {
            time: block.time,
            version: block.version,
            blocks: block.blocks,
          },
        },
      },
    });
    console.log(post);

    res.json(post);
  } catch (error) {
    console.log(error);

    res.json("error");
  }
});

export default handler;
