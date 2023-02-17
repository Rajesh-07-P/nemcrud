const jwt = require("jsonwebtoken");
require("dotenv").config();

const authentication = (req, res, next) => {
  const token = req.headers.auth;
  jwt.verify(token, process.env.key, function (err, decoded) {
    if (err) {
      res.send(err);
    } else {
      req.body.userID=decoded.userID;
      req.body.author=decoded.author;
      next();
    }
  });
};

module.exports = {
  authentication,
};
