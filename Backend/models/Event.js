import mongoose, { model, mongo, Schema } from "mongoose";

const EventSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "judul event wajib di isi"],
    },
    description: {
      type: String,
      required: [true, "deskripsi event wajib di isi"],
    },
    date: {
      type: Date,
      required: [true, "tanggaal event wajib di isi"],
    },
    location: {
      type: String,
      required: [true, "lokasi event wajib di isi"],
      trim: true,
    },
    price: {
      type: Number,
      required: [true, "harga event wajib di isi"],
      min: [0, "harga tidak boleh negatif"],
    },
    quota: {
      type: Number,
      required: [true, "kuota event wajib di isi"],
      min: [1, "tiket tersedia minimal 1"],
    },
    image: {
      type: String,
      required: [true, "gambar event wajib di isi"],
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const Event = mongoose.models.Event || mongoose.model("Event", EventSchema);
export default Event;
