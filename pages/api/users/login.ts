import { prisma } from "src/prisma";
import nc from "next-connect";
import onError from "src/components/onError";
import cookie from "cookie";
import jwt from "jsonwebtoken";
const handler = nc({
  onError,
});

handler.post(async (req, res) => {
  const data = JSON.parse(req.body);
  if (!data.email || !data.password) {
    return res.status(404).json({ error: "no email or password" });
  }
  const foundUser = await prisma.user.findFirst({
    where: {
      email: data.email,
      password: data.password,
    },
  });
  if (!foundUser) {
    return res
      .status(400)
      .json({ error: "User is not found or wrong email/password" });
  }
  const token = jwt.sign(
    { email: foundUser.email || null },
    process.env.JWT_SECRET,
    {
      expiresIn: "1d",
    }
  );
  res.setHeader(
    "Set-Cookie",
    cookie.serialize("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      sameSite: "strict",
      maxAge: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      path: "/",
    })
  );
  res.json(foundUser);
});

export default handler;
