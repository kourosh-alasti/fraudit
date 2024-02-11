const { default: mongoose } = require("mongoose");

const frauditSchema = mongoose.Schema(
  {
    id: String,
    title: String,
    description: String,
    created_at: Date,
    member_count: Number,

    id: {
      type: String,
      required: true,
      unique: true,
    },
    title: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    created_at: {
      type: Date,
      required: true,
    },
    member_count: {
      type: Number,
      required: true,
      default: 1,
    },
  },
  { timestamps: true }
);

const Fraudit = mongoose.model("Fraudit", frauditSchema);
export default Fraudit;
