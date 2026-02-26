import express from "express";
import cors from "cors";
import { authRouter } from "./routes/auth.routes";
import { usersRouter } from "./routes/users.routes";
import { errorHandler } from "./middlewares/error";

export const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (_req, res) => res.send("API running. Try /health"));
app.get("/health", (_req, res) => res.json({ ok: true, time: new Date().toISOString() }));

app.use("/api/auth", authRouter);
app.use("/api/users", usersRouter);

app.use(errorHandler);