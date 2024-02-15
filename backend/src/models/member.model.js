const { default: mongoose } = require('mongoose')

const memberSchema = mongoose.Schema(
  {
    frauditId: { type: String, required: true },
    userId: { type: String, required: true },
    // "member", "admin", "owner"
    permissionLevel: { type: String, required: true }
  },
  { timestamps: true }
)

const Member = mongoose.model('Member', memberSchema)
module.exports = Member
