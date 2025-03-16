import mongoose from "mongoose";

const logSchema = new mongoose.Schema({
  name: { type: String, required: true },
  message: { type: String, required: true },
  date: { type: String, required: true },
  heure: { type: String, required: true },
});

export const Log = mongoose.model("Log", logSchema);