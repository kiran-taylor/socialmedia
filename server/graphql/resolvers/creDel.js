const checkauth = require("../../util/authcheck");
const { UserInputError } = require("apollo-server");

const Post = require("../../models/Post");

module.exports = {
  Mutation: {
    async createPost(_, { body }, context) {
      console.log("createPost");
      const user = checkauth(context);
      // console.log("context", context);
      // console.log("user", user);
      if (body.trim() === "") {
        throw new UserInputError("post body must not be empty", {
          errors: {
            body: "body must not be empty",
          },
        });
      }
      if (user) {
        const newPost = new Post({
          username: user.username,
          body,
          createdAt: new Date().toISOString(),
        });

        const post = await newPost.save();

        return post;
      }
    },

    async deletePost(_, { postid }, context) {
      console.log("deletePost");

      const user = checkauth(context);

      if (!postid) {
        throw new Error("postid must not be empty");
      }

      const post = await Post.findById(postid);
      if (post.username === user.username) {
        await post.delete();
        return "post deleted successfully";
      } else {
        throw new Error("post not found");
      }
    },
  },
};
