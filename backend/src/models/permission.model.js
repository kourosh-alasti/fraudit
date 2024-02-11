const { default: mongoose } = require("mongoose");

var permissionSchema = mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  frauditId: {
    type: String,
    required: true,
  },
  permission: {
    type: String,
    required: true,
  },
});

const Permission = mongoose.model("Permission", permissionSchema);
export default Permission;
