import mongoose from "mongoose";

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("mongoose connect");
  } catch (err) {
    console.error("MongoDB connection error:", err.message);
    
    process.exit(1);
  }
};

export default connectDb;
