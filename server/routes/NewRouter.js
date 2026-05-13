const express = require("express");
const New = require("../db/newModel");
const router = express.Router();

router.get("/news", async (request, response) => {
  try {
    const news = await New.find({});
    if (news) {
      response.send(news);
    } else {
      response.send({ message: "Khong co du lieu" });
    }
  } catch (error) {
    response.status(500).send({ error });
    console.log("Loi be");
  }
});
router.get("/news/:id", async (request, response) => {
  try {
    const neww = await New.findOne({ id: request.params.id });
    response.status(200).send(neww);
  } catch (error) {
    response.status(500).send({ error });
  }
});

module.exports = router;
