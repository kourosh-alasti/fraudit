const { default: mongoose } = require('mongoose')

const memberSchema = mongoose.Schema(
  {
    fraudit_id: { type: String, required: true },
    user_id: { type: String, required: true },
    // "member", "admin", "owner"
    permission_lvl: { type: String, required: true }
  },
  { timestamps: true }
)

const Member = mongoose.model('Member', memberSchema)
module.exports = Member
