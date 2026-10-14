import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import chatRouter from "./routes/chat.routes.js";
import { verifyAuth } from "../../shared/middleware/auth.middleware.js";
const app = express();

app.use(express.json({ limit: "16kb" }));
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  }),
);

app.use("/", verifyAuth, chatRouter);

export { app };
