const express = require("express");
const Post = require("../db/postModel");
const router = express.Router();

router.get("/test", (req, res) => res.send("test"));

router.get("/posts", async (request, response) => {
  try {
    const posts = await Post.find({});
    response.send(posts);
  } catch (error) {
    response.status(500).send({ error });
  }
});

router.get("/posts/:slug", async (request, response) => {
  try {
    const post = await Post.findOne({ slug: request.params.slug });
    response.send(post);
  } catch (error) {
    response.status(500).send({ error });
  }
});

router.post("/post", async (request, response) => {
  const post = new Post(request.body);
  try {
    await post.save();
    response.send(post);
  } catch (error) {
    response.status(500).send({ message: error.message || error });
  }
});

router.patch("/posts/:slug", async (request, response) => {
  try {
    const post = await Post.findOneAndUpdate(
      { slug: request.params.slug },
      request.body,
      { new: true },
    );
    if (!post) {
      return response.status(404).send({ message: "Post not found" });
    }
    response.send(post);
  } catch (error) {
    response.status(500).send({ error: error.message });
  }
});

router.post("/posts/:slug/comments", async (req, res) => {
  try {
    const { comment } = req.body;
    if (!comment) {
      return res.status(400).send({ message: "Khong duoc bo trong" });
    }
    const post = await Post.findOneAndUpdate(
      { slug: req.params.slug },
      { $push: { comments: comment.trim() } },
      { new: true },
    );
    if (!post) {
      return res.status(404).send({ message: "Post not found" });
    }
    res.status(200).send(post);
  } catch (error) {
    res.status(500).send({ error });
  }
});

router.delete("/posts/:slug", async (request, response) => {
  console.log("DELETE route hit for slug:", request.params.slug);
  try {
    const post = await Post.findOneAndDelete({ slug: request.params.slug });
    if (!post) {
      return response.status(404).send("Post wasn't found");
    }
    response.status(204).send();
  } catch (error) {
    response.status(500).send({ error });
  }
});

module.exports = router;
console.log("PostRouter routes defined");
