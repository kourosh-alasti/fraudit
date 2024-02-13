const Member = require("../../../models/member.model");

const getMembers = async (id) => {
  const members = Member.find().where(frauditId, id);

  if (!members) {
    //TODO: ERROR HANDLING
    throw new Error("No SubFraudit exists with this ID");
  }

  return members;
};

module.exports = getMembers;
