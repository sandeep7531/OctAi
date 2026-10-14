import express from "express";
import cors from "cors";
import authRoutes from "./routers/auth.routes.js";
import cookieParser from "cookie-parser";

const app = express();

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  }),
);

app.use(express.json({ limit: "16kb" }));
app.use(cookieParser())

app.use("/", authRoutes);

export { app };
