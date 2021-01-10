const Post = require("../../models/Post");

module.exports = {
  Query: {
    async getPosts() {
      const posts = await Post.find().sort({ createdAt: -1 });
      if (posts) {
        return posts;
      } else {
        throw new Error("posts not found");
      }
    },
  },
};
