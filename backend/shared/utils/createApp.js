import express from "express";
import cookieParser from "cookie-parser";

export const createSerciveApp = () => {
  const app = express();
  app.use(express.json({ limit: "16kb" }));
  app.use(cookieParser());
  return app;
};
