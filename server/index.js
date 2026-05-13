const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const dbConnect = require("./db/dbConnect");

const postRouter = require("./routes/PostRouter");
console.log("PostRouter loaded");

const newRouter = require("./routes/NewRouter");
console.log("NewRouter loaded");

const app = express();
const jsonParser = bodyParser.json();

const userRouter = require("./routes/UserRouter");
console.log("userModel loaded");

app.use(cors());
app.use(jsonParser);
app.use("/api", userRouter);
app.use("/api", postRouter);
app.use("/api", newRouter);

(async () => {
  await dbConnect();
  app.listen(8080, () => {
    console.log("Server listening on port 8080");
  });
})();
