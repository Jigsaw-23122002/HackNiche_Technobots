const express = require("express");
require("dotenv").config();
const app = express();
const IPFS = require("ipfs-core");
const makeIpfsFetch = require("ipfs-fetch");
const PORT = process.env.PORT || 4500;

app.post("/", async (req, res) => {
  const ipfs = await IPFS.create();
  const fetch = await makeIpfsFetch({ ipfs });

  const response = await fetch(
    "ipfs://bafybeiddtaq7habtwqclw3j5patjeq2zhzqkqefz5zawpbpgnba737mkg4"
  );
  const text = await response.text();

  console.log(text);
});

app.listen(PORT, (error) => {
  if (!error)
    console.log(
      "Server is Successfully Running and App is listening on port " + PORT
    );
  else console.log("Error occurred, server can't start", error);
});
