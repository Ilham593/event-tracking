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
      uniqe: true
    },

    password: {
      type: String,
      required: true,
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

// membuat modeluser
const User = mongoose.model("User", UserSchema);
export default User;
