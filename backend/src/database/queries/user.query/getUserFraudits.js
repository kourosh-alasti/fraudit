const User = require("../../../models/user.model");
const Member = require("../../../models/member.model");
const { getUserInformation } = require(".");

const getUserFraudits = async (id) => {
  const user = await getUserInformation(id);

  if (!user) {
    //TODO: Error Handling
    throw new Error("User does not exist");
  }

  const members = await Member.find({ userId: id });

  // TODO: NEED REST
};
