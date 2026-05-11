const mongoose = require("mongoose");
const dbConnect = require("./db/dbConnect");
const User = require("./db/userModel");
(async () => {
    await dbConnect();
    const users = await User.find({});
    console.log("All users in DB:");
    users.forEach(u => console.log(`Username: '${u.username}', Password: '${u.password}'`));
    process.exit();
})();
