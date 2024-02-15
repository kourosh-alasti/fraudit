import { mongoose } from 'mongoose'

const courseSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    number: {
      type: String,
      required: true
    },
    abbreviation: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
)

const Course = mongoose.model('Course', courseSchema)
export default Course
