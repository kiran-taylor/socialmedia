const { model, Schema } = require("mongoose");

const postSchema = new Schema({
  username: String,
  body: String,
  createdAt: String,
  comments: [
    {
      username: String,
      body: String,
      createdAt: String,
    },
  ],
  likes: [
    {
      username: String,
      createdAt: String,
    },
  ],
  user: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
});

// exporting model itself with the schema
module.exports = model("Post", postSchema);
