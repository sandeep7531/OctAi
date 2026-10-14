
import dotenv from "dotenv";
import connectDB from "../../shared/db/index.js";
import { app } from "./app.js";

dotenv.config();
const port = process.env.PORT || 8002;

connectDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`Auth listening on port ${port}`);
    });
    app.on("error", (error) => {
      console.log(error);
      throw error;
    });
  })
  .catch((err) => {
    console.log("Mongo DB Connection Error", err);
  });
