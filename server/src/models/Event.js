const { Schema, model } = require('mongoose');

const EventSchema = new Schema({
  title: { type: String, required: true },
  description: String,
  start: { type: Date, required: true },
  end: { type: Date, required: true },
  allday: Boolean,
  color: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = model("Event", EventSchema);
