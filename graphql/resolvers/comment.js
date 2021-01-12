const { UserInputError } = require("apollo-server");

const checkauth = require("../../util/authcheck");
const Post = require("../../models/Post");

module.exports = {
  Mutation: {
    async createComment(_, { postid, body }, context) {
      console.log("createComment");
      const user = checkauth(context);

      if (body.trim() === "") {
        throw new UserInputError("comment must must not be empty", {
          errors: {
            body: "comment is empty",
          },
        });
      }

      const post = await Post.findById(postid);
      if (post) {
        post.comments.unshift({
          body,
          username: user.username,
          createdAt: new Date().toISOString(),
        });
        await post.save();
        return post;
      } else {
        throw new UserInputError("post not found");
      }
    },
    async deleteComment(_, { postid, commentid }, context) {
      console.log("deleteComment");
      const user = checkauth(context);

      const post = await Post.findById(postid);
      if (post) {
        const commentIdx = post.comments.findIndex((c) => c.id === commentid);
        try {
          if (post.comments[commentIdx].username === user.username) {
            post.comments.splice(commentIdx, 1);
            await post.save();
            return post;
          } else {
            throw new UserInputError("POST NOT FOUND");
          }
        } catch (e) {
          throw new UserInputError(e);
        }
      }
    },
    async likes(_, { postid }, context) {
      console.log("likes");
      const user = checkauth(context);

      const post = await Post.findById(postid);
      if (post) {
        if (post.likes.find((e) => e.username === user.username)) {
          post.likes = post.likes.filter((e) => e.username !== user.username);
        } else {
          post.likes.push({
            username: user.username,
            createdAt: new Date().toISOString(),
          });
        }
        await post.save();
        return post;
      }
    },
  },
};
