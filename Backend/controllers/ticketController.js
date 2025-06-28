import Event from "../models/Event.js";
import Orders from "../models/Orders.js";
import { v4 as uuidv4 } from "uuid";
import User from "../models/User.js";
export const beliTiket = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { eventId, ticketType, quantity } = req.body;

    console.log("Body request:", req.body);
    const parsedQty = parseInt(quantity);

    if (!eventId || !ticketType || isNaN(parsedQty) || parsedQty <= 0) {
      return res
        .status(400)
        .json({ msg: "Data pembelian tidak lengkap atau salah" });
    }

    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ msg: "Event tidak ditemukan" });
    }

    if (event.quota < parsedQty) {
      return res.status(400).json({ msg: "Stok tiket tidak cukup" });
    }

    const totalPrice = event.price * parsedQty;
    const qr_code_data = uuidv4();

    event.quota -= parsedQty;
    await event.save();

    const orders = await Orders.create({
      user: userId,
      event: eventId,
      ticketType,
      quantity: parsedQty,
      totalPrice,
      qrCodeData: qr_code_data,
      status: "paid",
    });

    res.status(201).json({
      msg: "Tiket berhasil dibeli",
      orders,
    });
  } catch (err) {
    res
      .status(500)
      .json({ msg: "Terjadi kesalahan server", error: err.message });
  }
};

export const getMyTickets = async (req, res) => {
  try {
    const userId = req.user.userId;

    const myTicket = await Orders.find({ user: userId })
      .populate("event")
      .populate("user");

    if (myTicket.length === 0) {
      return res.status(400).json({
        msg: "anda belum memesan tiket apapun",
      });
    }

    res.status(200).json({
      msg: "tiket berhasil di ambil",
      ticket: myTicket,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      msg: "tejadi kesalahan server",
      error: err.message,
    });
  }
};
