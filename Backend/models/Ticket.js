import mongoose, { mongo, Schema } from "mongoose";
const TicketSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    event: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
    },
    qr_code_data: {
      type: String,
    },
    purchase_date: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

const Ticket = mongoose.model("Ticket", TicketSchema);
export default Ticket;
