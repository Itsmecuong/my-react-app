import express from "express";
import cors from "cors";
import BlogPosts from "./BlogPosts.js";
const app = express();

app.use(cors());
app.get("/api/posts", function (req, res) {
  res.send(JSON.stringify(BlogPosts));
});

app.get("/api/posts/:slug", function (req, res) {
  const slug = req.params.slug;
  const post = BlogPosts.find((e) => e.slug == slug);
  if (post) {
    res.send(JSON.stringify(post));
  } else {
    res.status(404).send("NOT FOUND");
  }
});

app.listen(8080, function () {
  console.log("Server is running on 8080");
});
