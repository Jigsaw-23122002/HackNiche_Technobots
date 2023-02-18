const express = require("express");
require("dotenv").config();
const app = express();
const PORT = process.env.PORT || 4500;

app.post("/", (req, res) => {
  console.log("nice");
});

app.listen(PORT, (error) => {
  if (!error)
    console.log(
      "Server is Successfully Running and App is listening on port " + PORT
    );
  else console.log("Error occurred, server can't start", error);
});
