// express
const express = require("express");
// search route
const searchRouter = require("./routes/searchRoute");
// cors
const cors = require("cors");
const app = express();

// enable cors
app.use(cors());
// search route
app.use("/search", searchRouter);

// set port
const port = 8080;

// listen to port 8080
app.listen(port, () => {
  console.log("Server is up and running on port number " + port);
});

module.exports = app;

