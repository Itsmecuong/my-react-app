const express = require("express");
const User = require("../db/userModel");
const router = express.Router();

router.post("/register", async (request, response) => {
  try {
    const creds = {
      username: request.body.username,
      password: request.body.password,
    };
    const check = await User.findOne({ username: creds.username });
    if (!check) {
      const newUser = new User(creds);
      await newUser.save();
      response.status(200).send({ message: "Register successfully" });
    } else {
      response.status(400).send({ message: "Tài khoản đã tồn tại!" });
    }
  } catch (error) {
    response
      .status(500)
      .send({ message: "Register failed", error: error.message });
  }
});

router.post("/login", async (request, response) => {
  try {
    const creds = {
      username: request.body.username,
      password: request.body.password,
    };
    console.log("Login:", creds);
    const user = await User.findOne(creds);

    if (user) {
      response.status(200).send({ message: "Login successfully", user });
    } else {
      response.status(400).send({ message: "Login failed" });
    }
  } catch (error) {
    response.status(500).send({ error: error.message });
  }
});

router.get("/stat/list", async (request, response) => {
  try {
    const lists = await User.find({});
    if (lists) {
      response.status(200).send(lists);
    } else {
      response.status(400).send({ message: "Not found" });
    }
  } catch (error) {
    response.status(500).send({ error });
  }
});
module.exports = router;
