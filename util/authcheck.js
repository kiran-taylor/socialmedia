const jwt = require("jsonwebtoken");

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
        throw new Error("invalid token");
      }
    } catch (e) {
      throw new Error("Invalid Token");
    }
  } else {
    throw new Error("Authorization error");
  }
};
