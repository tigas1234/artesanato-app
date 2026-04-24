import { auth } from "../lib/auth.js";

export const requireAuth = async (req, res, next) => {
  const session = await auth.api.getSession({
    headers: req.headers,
  });

  if (!session) {
    return res.status(401).json({ error: "Não autorizado" });
  }

  req.user = session.user;
  next();
};