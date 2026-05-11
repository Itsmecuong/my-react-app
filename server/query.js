const mongoose = require("mongoose");
const dbConnect = require("./db/dbConnect");
const User = require("./db/userModel");
(async () => {
    await dbConnect();
    const users = await User.find({});
    console.log("Users:", users);
    process.exit();
})();
