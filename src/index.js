import express from "express";
import dotenv from "dotenv";
import { auth } from "./lib/auth.js";
import { toNodeHandler } from "better-auth/node";
import { requireAuth } from "./middleware/auth.js";
dotenv.config();
const app = express();
app.use(express.json());
app.all("/api/auth/*path", toNodeHandler(auth));
app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

app.get("/api/me", requireAuth, (req, res) => {
  res.json({
    message: "ok",
    user: req.user,
  });
});

app.listen(5500, () => {
  console.log("Servidor rodando na porta 5500");
});