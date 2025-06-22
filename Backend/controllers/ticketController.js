import Ticket from "../models/Ticket.js";
import Event from "../models/Event.js";
export const createTicket = async (req, res) => {
  try {
    const userId = req.user.userId;
    const eventId = req.body.eventId;

    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(400).json({ msg: "event tidak ada" });
    }

    const ticket = await Ticket.create({
      user: userId,
      event: eventId,
      qr_code_data: "generate_qr_code_data_here",
      purchase_date: new Date(),
    });

    res.status(201).json({
      msg: "tiket berhasil di beli",
      ticket,
    });
  } catch (err) {
    res.status(500).json({ msg: "gagal memembeli", error: err.message });
  }
};

export const getMyTickets = async (req, res) => {
  try {
    const tickets = await Ticket.find({ user: req.user.userId })
      .populate("event")
      .populate("user");

    if (tickets.length === 0) {
      return res.status(404).json({
        msg: "maaf anda belum ada membeli tiket",
      });
    }

    res.json({
      tickets,
    });
  } catch (err) {
    res.status(500).json({ msg: "gagal mengambil tiket", error: err.message });
  }
};
