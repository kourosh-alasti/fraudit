const { default: mongoose } = require("mongoose");

const frauditSchema = mongoose.Schema({
  id: String,
  title: String,
  description: String,
  created_at: Date,
  member_count: Number,
});

export const Fraudit = mongoose.model("Fraudit", frauditSchema);
