const User = require("../../../models/user.model");
const Member = require("../../../models/member.model");
const { getUserInformation } = require(".");

const getUserFraudits = async (id) => {
  const user = await getUserInformation(id);

  Member.find().where({ userId: id });

  // TODO: NEED REST
};
