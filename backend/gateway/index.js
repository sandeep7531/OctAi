import dotenv from "dotenv";
import proxy from "express-http-proxy";
import cors from "cors";
import userRouter from "./routers/user.routes.js";
import { createSerciveApp } from "../shared/utils/createApp.js";

dotenv.config();
const port = process.env.PORT;

const app = createSerciveApp();

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  }),
);

app.use("/", userRouter);

app.use("/api/auth", proxy(process.env.AUTH_SERVICE));
app.use("/api/chat", proxy(process.env.CHAT_SERVICE));
app.use("/api/agent", proxy(process.env.AGENTS_SERVICE));

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});

app.on("error", (error) => {
  console.log(error);
  throw error;
});
