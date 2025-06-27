import mongoose, { mongo } from "mongoose";
import Event from "../models/Event.js";

export const getAllEvents = async (req, res) => {
  try {
    //urut dari yang paling baru
    const events = await Event.find({ date: { $gte: new Date() } })
      .sort({ date: 1 })
      .select("-__v");

    // selalu kirim array, meskipun kosong
    res.status(200).json(events);
  } catch (err) {
    res
      .status(500)
      .json({ msg: "terjadi kesalahan server", error: err.message });
  }
};

export const getEventDetail = async (req, res) => {
  try {
    const id = req.params.id;

    // Validasi ID terlebih dahulu
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ msg: "ID tidak valid" });
    }

    // Cari event berdasarkan ID dan buang field __v
    const event = await Event.findById(id).select("-__v");

    if (!event) {
      return res.status(404).json({ msg: "event tidak di temukan" });
    }

    res.status(200).json({
      event,
    });
  } catch (err) {
    res
      .status(500)
      .json({ msg: "gagal mendapatkan data event", error: err.message });
  }
};

// admin
export const createEvent = async (req, res) => {
  try {
    const { title, description, date, location, price, quota, image } =
      req.body;

    if (
      !title ||
      !description ||
      !date ||
      !location ||
      !price ||
      !quota ||
      !image
    ) {
      return res.status(400).json({
        msg: "Semua field wajib diisi!",
      });
    }

    const eventExist = await Event.findOne({ title, date });
    if (eventExist) {
      return res.status(409).json({
        msg: "event dengan judul dan date ini sudah ada",
      });
    }

    const newEvent = await Event.create({
      title,
      description,
      date,
      location,
      price,
      quota,
      image,
    });

    res.status(201).json({
      msg: "berhasil di buat",
      newEvent,
    });
  } catch (err) {
    res
      .status(500)
      .json({ msg: "terjadi kesalahan server", error: err.message });
  }
};

export const updateEvent = async (req, res) => {
  try {
    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        msg: "ID tidak valid",
      });
    }

    const eventExist = await Event.findById(id);
    if (!eventExist) {
      return res.status(404).json({ msg: "event tidak ditemukan" });
    }

    const {
      title = "",
      description = "",
      date,
      location = "",
      price,
      quota,
      image,
    } = req.body;

    if (!title.trim() || !description.trim() || !location.trim() || !date) {
      return res.status(400).json({ msg: "Field wajib tidak boleh kosong" });
    }

    // Update data
    const updated = await Event.findByIdAndUpdate(
      id,
      {
        title: title.trim(),
        description: description.trim(),
        date,
        location: location.trim(),
        price,
        quota,
        image,
      },
      // biar updated langusgn keliatan
      { new: true, runValidators: true }
    );

    res.status(200).json({
      updated,
      msg: "event berhasil di update",
    });
  } catch (err) {
    res.status(500).json({
      msg: "terjadi kesalahan server",
      error: err.message,
    });
  }
};

export const deleteEvent = async (req, res) => {
  try {
    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        msg: "ID tidak valid",
      });
    }

    const event = await Event.findById(id);
    if (!event) {
      return res.status(404).json({
        msg: "event tidak di temukan",
      });
    }

    const deletedEvent = await Event.findByIdAndDelete(id);

    res.status(200).json({
      msg: "Event berhasil di hapus",
      deletedEvent,
    });
  } catch (err) {
    res.status(500).json({
      msg: "terjadi kesalahan server",
      error: err.message,
    });
  }
};
