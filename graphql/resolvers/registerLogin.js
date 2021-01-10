const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { UserInputError } = require("apollo-server");

const User = require("../../models/User");
const { SECRET_KEY } = require("../../config");
const {
  validateRegisterInput,
  validateLoginInput,
} = require("../../util/validators");

function generateToken(res) {
  return jwt.sign(
    {
      id: res.id,
      username: res.username,
      email: res.email,
    },
    SECRET_KEY,
    { expiresIn: "1h" }
  );
}

module.exports = {
  Mutation: {
    async login(_, { username, password }) {
      const { errors, valid } = validateLoginInput(username, password);

      if (!valid) {
        throw new UserInputError("errors", { errors });
      }
      const user = await User.findOne({ username });
      if (!user) {
        throw new UserInputError("user not found", {
          errors: {
            username: "user not found",
          },
        });
      }

      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        throw new UserInputError("password doesnt match", {
          errors: {
            password: "password doesnt match",
          },
        });
      }
      const token = generateToken(user);
      return {
        ...user._doc,
        id: user._id,
        token,
      };
    },
    async register(
      _,
      { registerInput: { username, password, confirmPassword, email } }
    ) {
      // validate input values
      // check user match
      // issue token to user

      const { errors, valid } = validateRegisterInput(
        username,
        password,
        confirmPassword,
        email
      );

      if (!valid) {
        throw new UserInputError("errors", { errors });
      }

      const user = await User.findOne({ username });
      if (user) {
        throw new UserInputError("errors", {
          errors: {
            username: "username is taken",
          },
        });
      }

      password = await bcrypt.hash(password, 12);
      const newUser = new User({
        username,
        password,
        email,
        createdAt: new Date().toISOString(),
      });

      const res = await newUser.save();

      const token = generateToken(res);
      return {
        ...res._doc,
        id: res._id,
        token,
      };
    },
  },
};
