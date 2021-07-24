import nc from "next-connect";
import onError from "src/components/onError";
const cloudinary = require("cloudinary").v2;

const handler = nc({
  onError,
});

handler.get(async (req, res) => {
  try {
    const timestamp = Math.round(new Date().getTime() / 1000);
    const signature: string = cloudinary.utils.api_sign_request(
      {
        timestamp,
      },
      process.env.CLOUDINARY_API_SECRET
    );

    res.json({ timestamp, signature });
  } catch (error) {
    console.log(error);
  }
});

export default handler;
