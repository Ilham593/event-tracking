import mongoose, { model, mongo, Schema } from 'mongoose'

const EventSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  date: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  quota: {
    type: Number,
    required: true
  },
  image: {
    type: String,
    required: true
  },
})

const Event = mongoose.model("Event", EventSchema)
export default Event