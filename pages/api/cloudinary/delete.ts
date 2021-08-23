import nc from "next-connect";
import onError from "src/components/onError";
const cloudinary = require("cloudinary").v2;

const handler = nc({
  onError,
});

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

handler.post(async (req, res) => {
  try {
    const image = await cloudinary.uploader.destroy(req.body.imgId);
    console.log(image);
  } catch (error) {
    console.log(error);
  }
});

export default handler;
