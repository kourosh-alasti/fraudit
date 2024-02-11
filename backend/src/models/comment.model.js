const { default: mongoose } = require("mongoose");

const commentSchema = mongoose.Schema({
  id: String,
  content: String,
  fraudit_id: String,
  user_id: String,
  posted_at: Date,
});

const Comment = mongoose.model("Comment", commentSchema);
export default Comment;
