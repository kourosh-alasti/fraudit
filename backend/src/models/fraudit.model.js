const { default: mongoose } = require("mongoose");

const frauditSchema = mongoose.Schema({
  id: String,
  title: String,
  description: String,
  created_at: Date,
  member_count: Number,
});

const Fraudit = mongoose.model("Fraudit", frauditSchema);
export default Fraudit;
