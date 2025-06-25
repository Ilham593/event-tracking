import Event from "../models/Event.js";

export const getAllEvents = async (req, res) => {
  try {
    const events = await Event.find();

    // selalu kirim array, meskipun kosong
    res.status(200).json(events);

  } catch (err) {
    res.status(500).json({ msg: "gagal mengambil data", error: err.message });
  }
};



export const getEventDetail = async (req, res) => {
  try {
    const id = req.params.id;
    const event = await Event.findById(id);
    if (!event) {
      return res.status(404).json({ msg: "id tidak di temukan" });
    }

    res.json(event);
  } catch (err) {
    res.status(500).json({ msg: "gagal mendapatkan data", error: err.message });
  }
};

// admin
export const createEvent = async (req, res) => {
  try {
    const role = req.user.role;
    const { title, description, date, location, price, quota, image } =
      req.body;

    if (role !== "admin") {
      return res.status(400).json({
        msg: "anda bukan admin",
      });
    }

    const postevent = await Event.create({
      title,
      description,
      date,
      location,
      price,
      quota,
      image,
    });

    res.json({
      postevent,
    });
  } catch (err) {
    res.status(500).json({ msg: "failed", error: err.message });
  }
};

export const updateEvent = async (req, res) => {
  try {
    const id = req.params.id;
    const role = req.user.role;
    const eventExist = await Event.findById(id);

    const { title, description, date, location, price, quota, image } =
      req.body;

    if (!eventExist) {
      return res.status(404).json({ msg: "event tidak ditemukan" });
    }

    if (role !== "admin") {
      return res.status(400).json({
        msg: "maaf anda bukan admin dan tidak berhak mengedit ini",
      });
    }

    if (!title || !description || !date || !location) {
      return res.status(400).json({ msg: "field wajib tidak boleh kosong" });
    }

    const updateEvent = await Event.findByIdAndUpdate(
      id,
      { title, description, date, location, price, quota, image },
      { new: true }
    );

    res.status(201).json({
      updateEvent,
      msg: "event berhasil di update",
    });
  } catch (err) {
    res.status(500).json({
      msg: "gagal",
      error: err.message,
    });
  }
};

export const deleteEvent = async (req, res) => {
  try {
    const id = req.params.id;
    const role = req.user.role;
    const event = await Event.findById(id);

    if (!event) {
      return res.status(400).json({
        msg: "event tidak di temukan",
      });
    }

    if (role !== "admin") {
      return res.status(400).json({
        msg: "anda bukan admin",
      });
    }

    const deletedEvent = await Event.findByIdAndDelete(id);

    res.json({
      msg: "event berhasil di hapus",
      deleteEvent,
    });
  } catch (err) {
    res.status(500).json({
      msg: "gagal menghapus event",
      error: err.message,
    });
  }
};
