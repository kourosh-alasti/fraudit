import { mongoose } from 'mongoose'

const threadSchema = new mongoose.Schema(
  {
    user_id: {
      type: String,
      required: true
    },
    fraudit_id: {
      type: String,
      required: true
    },
    content: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
)

const Thread = mongoose.model('Thread', threadSchema)
export default Thread
