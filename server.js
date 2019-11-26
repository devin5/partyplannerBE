const express = require("express");
const config = require("./middleware/configureMiddleware");
const restricted = require('./middleware/restrict');

const authRouter = require("./routes/authRouter")
const partiesRouter = require("./routes/partiesRouter")

server = express();

config(server);

server.use("/auth", authRouter);
server.use("/parties", restricted , partiesRouter);

server.get("/", (req, res) => {
  res.send("<h1>Hello World</h1>");
});

module.exports = server;
