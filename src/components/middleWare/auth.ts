import { prisma } from "src/prisma";
import jwt from "jsonwebtoken";
export default async (req, res, next) => {
  if (!req.cookies.token) {
    return res.status(401).json({ error: "access not allowed" });
  }
  const decoded = jwt.verify(req.cookies.token, process.env.JWT_SECRET);
  const user = await prisma.user.findUnique({
    where: {
      email: decoded.email,
    },
  });
  if (!user) {
    return res.status(401).json({ error: "User is not found" });
  }

  req.user = user;
  next();
};
