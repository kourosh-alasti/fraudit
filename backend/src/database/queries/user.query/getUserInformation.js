const User = require("../../../models/user.model");

const getUserInformation = async (id) => {
  const user = await User.findById(id);

  if (!user) {
    //TODO: ERROR HANDLER
    throw new Error("User Does Not Exist");
  }

  const { ...info } = user._doc;

  return {
    ...info,
  };
};

module.exports = getUserInformation;
