const { verify } = require("../utils/jwt");
const { fetchData } = require("../utils/postgres");

const verifyRole = (...roles) => {
  return async (req, res, next) => {
    let { token } = req.headers;

    if (!token) {
      res.status(403).send({
        success: false,
        message: "First give the token",
      });
      return;
    }

    let { id } = verify(token);

    let [user] = await fetchData("Select * from users where id = $1", id);

    if (user) {
      if (roles.find((el) => el == user.role)) {
        next();
      } else {
        res.status(403).send({
          success: false,
          message: "You are not allowed",
        });
      }
    } else {
      res.status(403).send({
        success: false,
        message: "Token error",
      });
    }
  };
};

module.exports = {
  verifyRole,
};
