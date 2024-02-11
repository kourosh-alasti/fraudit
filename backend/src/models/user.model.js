const { default: mongoose } = require("mongoose");

// var userSchema = mongoose.Schema({
//   id: String,
//   first_name: String,
//   last_name: String,
//   username: String,
//   email: String,
//   password: String,
//   permission: String,
// });

var userSchema = mongoose.Schema({
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
});

const User = mongoose.model("User", userSchema);
export default User;
