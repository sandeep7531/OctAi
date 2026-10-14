import mongoose from "mongoose";


const connectDB = async () => {
  try {
    await mongoose.connect(
      `${process.env.MONGODB_URI}/${process.env.MONGODB_NAME}`,
    );
    console.log("DB Connected");
  } catch (err) {
    console.error("DB connection Error", err);
    process.exit(1);
  }
};

export default connectDB;
