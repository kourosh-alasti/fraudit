const { default: mongoose } = require("mongoose");

var userSchema = mongoose.Schema({
  id: String,
  first_name: String,
  last_name: String,
  username: String,
  email: String,
  password: String,
  permission: String,
});

export const Person = mongoose.model("User", userSchema);
