import authRoutes from "./routers/auth.routes.js";
import { createSerciveApp } from "../../shared/utils/createApp.js";

const app = createSerciveApp();

app.use("/", authRoutes);

export { app };
