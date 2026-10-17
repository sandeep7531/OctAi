import { verifyAuth } from "../../shared/middleware/auth.middleware.js";
import { createSerciveApp } from "../../shared/utils/createApp.js";
import agentRouter from "./routes/agent.routes.js";

const app = createSerciveApp();
app.use("/", verifyAuth, agentRouter);

export { app };
