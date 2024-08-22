const mongoose = require("mongoose");

mongoose.connection.on("open", () => console.log("db connected"));
async function connectDb({ port, username, authentication, dbname }) {
  const uri = `mongodb://${username}:${authentication}${port}/${dbname}`;
  await mongoose.connect(uri);
}

module.exports = connectDb;
