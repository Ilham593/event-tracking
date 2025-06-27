import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import User from "../models/User.js";

dotenv.config();

const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    const hashedPassword = await bcrypt.hash("admin123", 10);

    const admin = await User.create({
      name: "admin",
      email: "admin@example.com",
      password: hashedPassword,
      role: "admin",
    });

    console.log(admin.email);
    process.exit()
  } catch (err) {
    console.error("terjadi kesalahan server", err);
    process.exit(1);
  }
};

createAdmin();
