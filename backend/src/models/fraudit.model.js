const { default: mongoose } = require('mongoose')

const frauditSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true
    },
    description: {
      type: String,
      required: true
    },
    slug: {
      type: String,
      unique: true,
      required: true
    },
    owner_id: {
      type: String,
      required: true
    },
    member_count: {
      type: Number,
      required: true,
      default: 1
    }
  },
  { timestamps: true }
)

const Fraudit = mongoose.model('Fraudit', frauditSchema)
module.exports = Fraudit
