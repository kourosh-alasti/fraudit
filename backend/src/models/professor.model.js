import { mongoose } from 'mongoose'

const professorSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    overallRating: {
      type: Number,
      required: true,
      default: 5
    }
  },
  { timestamps: true }
)

const Professor = mongoose.model('Professor', professorSchema)
export default Professor
