// import paket dari mongose unutk buat modeling
import mongoose, { Schema } from "mongoose";

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      match: [/^\S+@\S+\.\S+$/, "Format email tidak valid"],
    },

    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
  },
  {
    // otomasit menambahkan 2 field( created dan update)
    timestamps: true,
  }
);

// unutk mencegah terdaftar 2 kali
// Membuat model User dan mengekspornya
const User = mongoose.models.User || mongoose.model("User", UserSchema);
export default User;
