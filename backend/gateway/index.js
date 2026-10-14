import express from "express";
import dotenv from "dotenv";
import proxy from "express-http-proxy";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRouter from "./routers/user.routes.js";

dotenv.config();
const port = process.env.PORT;

const app = express();

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  }),
);

app.use(cookieParser());
app.use(express.json({ limit: "16kb" }));

app.use("/", userRouter);

app.use("/api/auth", proxy(process.env.AUTH_SERVICE));
app.use("/api/chat", proxy(process.env.CHAT_SERVICE));

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});

app.on("error", (error) => {
  console.log(error);
  throw error;
});
