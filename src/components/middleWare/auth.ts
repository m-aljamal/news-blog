import { getSession } from "next-auth/client";
export default async (req, res, next) => {
  const session = await getSession({ req });
  if (!session) {
    return res.status(401).json({ error: "you ara not allowed" });
  }
  if (session.role === "USER") {
    return res.status(401).json({ error: "user is not allowed" });
  }
  req.user = {
    ...session.user,
    role: session.role,
  };
  next();
};
