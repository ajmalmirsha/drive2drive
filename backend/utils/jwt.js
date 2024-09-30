const jwt = require("jsonwebtoken");

const genToken = (payload) => {
  return jwt.sign(payload, process.env.USER_JWT_SECRET, {
    expiresIn: "1day",
  });
};

module.exports = {
  genToken,
};
