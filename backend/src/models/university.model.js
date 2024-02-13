const { default: mongoose } = require("mongoose");

var universitySchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    abbreviation: {
      type: String,
      required: true,
    },
    overallRating: {
      type: Number,
      required: true,
      default: 5,
    },
    address: {
      type: Object,
      required: true,
      default: {
        street: null,
        city: null,
        state: null,
        zup: null,
      },
    },
  },
  { timestamps: true }
);

const University = mongoose.model("University", universitySchema);
module.exports = University;
