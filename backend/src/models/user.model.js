import { mongoose } from 'mongoose'

const userSchema = mongoose.Schema(
  {
    first_name: {
      type: String,
      required: true,
      unique: false
    },
    last_name: {
      type: String,
      required: false,
      unique: false
    },
    username: {
      type: String,
      required: true,
      unique: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    profile_picture: {
      type: String,
      default:
        'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'
    },
    isAdmin: {
      type: Boolean,
      default: false,
      required: true
    }
  },
  { timestamps: true }
)

const User = mongoose.model('User', userSchema)

export default User
