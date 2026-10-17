import dotenv from "dotenv";
import connectDB from "../../shared/db/index.js";
import { app } from "./app.js";

dotenv.config();
const port = process.env.PORT;

connectDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`Chat listening on port ${port}`);
    });
    app.on("error", (error) => {
      console.log(error);
      throw error;
    });
  })
  .catch((err) => {
    console.log("Mongo DB Connection Error", err);
  });
