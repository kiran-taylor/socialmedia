const { model, Schema } = require("mongoose");

const userSchema = new Schema({
  username: String,
  password: String,
  email: String,
  createdAt: String,
});

// exporting model itself with the schema
module.exports = model("User", userSchema);
