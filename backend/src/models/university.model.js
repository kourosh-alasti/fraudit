const { default: mongoose } = require('mongoose')

const universitySchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    abbreviation: {
      type: String,
      required: true
    },
    overallRating: {
      type: Number,
      required: true,
      default: 5
    },
    address: {
      type: {
        street: String,
        city: String,
        state: String,
        zipCode: String
      },
      required: true,
      default: {
        street: null,
        city: null,
        state: null,
        zipCode: null
      }
    }
  },
  { timestamps: true }
)

const University = mongoose.model('University', universitySchema)
module.exports = University
