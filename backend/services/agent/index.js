import "dotenv/config";
import connectDB from "../../shared/db/index.js";
import { app } from "./app.js";

const port = process.env.PORT;

connectDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`Agent listening on port ${port}`);
    });
    app.on("error", (error) => {
      console.log(error);
      throw error;
    });
  })
  .catch((err) => {
    console.log("Mongo DB Connection Error", err);
  });
