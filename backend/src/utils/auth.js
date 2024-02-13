const jwt = require("jsonwebtoken");
const { getUserInformation } = require("../database/queries/user.query/");

const verifyToken = (req, res, next) => {
  /*
   *  PULLS JWT TOKEN FROM COOKIES
   */
  const token = req.cookies.access_token;

  /*
   * CHECKS IF TOKEN EXISTS
   */
  if (!token) {
    // TODO: ERROR HANDLER
    return next();
  }

  /*
   * VERIFIES TOKEN AND SETS REQ.USER
   */
  jwt.verify(token, process.env.DEV_JWT_SECRET, (err, user) => {
    if (err) {
      // TODO: ERROR HANDLER
      return next();
    }

    req.user = user;
    next();
  });
};

const verifyIsAdmin = (req, res, next) => {
  const userId = req.user.id;

  const userInfo = getUserInformation(userId);
};

module.exports.verifyToken = verifyToken;
module.exports.verifyIsAdmin = verifyIsAdmin;
