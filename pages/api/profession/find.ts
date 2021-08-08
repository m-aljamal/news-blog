import nc from "next-connect";
import onError from "src/components/onError";

const handler = nc({
  onError,
});

handler.get((req, res) => {
  console.log(req.query);

  res.json("ddd");
});

export default handler;
