import mongoose, { mongo } from "mongoose";

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('mongoose connect')
  } catch (err) {
    console.log("err.meesage")
    process.exit(1)
  }
};

export default connectDb
