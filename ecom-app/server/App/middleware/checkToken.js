const jwt = require("jsonwebtoken");
let checkToken = (req, res, next) => {
  try {
    let token = req.headers.authorization.split(" ")[1];

    let deCode = jwt.decode(token, process.env.TOKENKEY);

    let { userId } = deCode;

    req.body.userId=userId
    next();
  } catch (error) {
    let obj = {
      _status: false,
      _message: "Invalid Token",
    };
    res.status(401).json(obj);

  }
};
module.exports = { checkToken };
