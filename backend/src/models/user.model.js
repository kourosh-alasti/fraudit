const { default: mongoose } = require("mongoose");

var userSchema = mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    first_name: {
      type: String,
      required: true,
      unique: false,
    },
    last_name: {
      type: String,
      required: false,
      unique: false,
    },
    email: {
      type: String,
      required: true,
      uniqure: true,
    },
    password: {
      type: String,
      require: true,
    },
    profile_picture: {
      type: String,
      default:
        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = User
