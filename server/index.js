const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const dbConnect = require("./db/dbConnect");
const postRouter = require("./routes/PostRouter");
console.log("PostRouter loaded");

const app = express();
const jsonParser = bodyParser.json();

app.use(cors());
app.use(jsonParser);

app.use("/api", postRouter);

app.use("/api", postRouter);

(async () => {
  await dbConnect();

  const userRouter = require("./routes/UserRouter");
  app.use("/api", userRouter);

  app.listen(8080, () => {
    console.log("Server listening on port 8080");
  });
})();
