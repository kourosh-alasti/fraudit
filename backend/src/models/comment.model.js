const { default: mongoose } = require("mongoose");

const commentSchema = mongoose.Schema({
  content: {
    type: String,
    required: true,
  },
  fraudit_id: {
    type: String,
    required: true,
  },
  user_id: {
    type: String,
    required: true,
  },
  posted_at: {
    type: Date,
    required: true,
  },
});

const Comment = mongoose.model("Comment", commentSchema);
export default Comment;
