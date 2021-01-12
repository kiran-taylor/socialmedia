const Post = require("../../models/Post");

module.exports = {
  Query: {
    async getPosts() {
      console.log("getPosts");
      const posts = await Post.find().sort({ createdAt: -1 });
      if (posts) {
        return posts;
      } else {
        throw new Error("posts not found");
      }
    },
    async getPost(_, { postid }) {
      try {
        const post = await Post.findById(postid);
        if (post) {
          return post;
        } else {
          throw new Error("Post not found");
        }
      } catch (e) {
        throw new Error(e);
      }
    },
  },
};
