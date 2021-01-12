const jwt = require("jsonwebtoken");
const { UserInputError } = require("apollo-server");

const { SECRET_KEY } = require("../config");

module.exports = (context) => {
  const authHeaders = context.req.headers.authorization;
  if (authHeaders) {
    const token = authHeaders.split("Bearer ")[1];
    try {
      if (token) {
        const user = jwt.verify(token, SECRET_KEY);
        return user;
      } else {
        throw new UserInputError("invalid token");
      }
    } catch (e) {
      throw new UserInputError("Invalid Token");
    }
  } else {
    throw new UserInputError(" bro Authorization error", {
      errors: {
        auth: "authentication error",
      },
    });
  }
};
