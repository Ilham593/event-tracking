import mongoose, { Schema } from "mongoose";
const OrdersSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    event: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
      required: true,
    },
    ticketType: {
      type: String,
      required: true,
      trim: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: [1, "Minimal 1 tiket"],
    },
    totalPrice: {
      type: Number,
      required: true,
      min: [0, "Total harga tidak boleh negatif"],
    },
    qrCodeData: {
      type: String,
      default: "",
    },
    status: {
      type: String,
      enum: ["pending", "paid"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

const Orders = mongoose.model("Orders", OrdersSchema);
export default Orders;
