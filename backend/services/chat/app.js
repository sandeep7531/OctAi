import chatRouter from "./routes/chat.routes.js";
import { verifyAuth } from "../../shared/middleware/auth.middleware.js";
import { createSerciveApp } from "../../shared/utils/createApp.js";
const app = createSerciveApp();


app.use("/", verifyAuth, chatRouter);

export { app };
