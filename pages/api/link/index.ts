import nc from "next-connect";
import onError from "src/components/onError";
const metascraper = require("metascraper")([
  require("metascraper-description")(),
  require("metascraper-image")(),
  require("metascraper-title")(),
]);
import got from "got";
const handler = nc({
  onError,
});

handler.get(async (req, res) => {
  const { parse } = require("url");
  const targetUrl = parse(req.url, true).query?.url;
  const { body: html, url } = await got(targetUrl);
  const metadata = await metascraper({ html, url });

  res.json({
    success: 1,
    meta: {
      title: metadata.title,
      description: metadata.description,
      image: {
        url: metadata.image,
      },
    },
  });
});

export default handler;
