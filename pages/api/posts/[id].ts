import nc from "next-connect";
import auth from "src/components/middleWare/auth";
import onError from "src/components/onError";
import prism from "src/prisma";
const handler = nc({
  onError,
});

handler.use(auth);
handler.delete(async (req, res) => {
  try {
    const [deleteBlock, deletePost] = await Promise.all([
      await prism.block.deleteMany({
        where: {
          postId: req.query.id,
        },
      }),

      await prism.post.delete({
        where: {
          id: req.query.id,
        },
      }),
    ]);

    res.json(deletePost);
  } catch (error) {
    console.log("error");
  }
});
export default handler;
