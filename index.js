const express = require("express");
const axios = require("axios");
const cheerio = require("cheerio");
const PORT = 8000;
const app = express();

const challenges = [];

app.get("/", async (req, res) => {
  res.json({
    message: "Hello World!",
  });
});

app.get("/challenges", async (req, res) => {
  axios.get("https://ghw.mlh.io/challenges").then((response) => {
    const html = response.data;
    const $ = cheerio.load(html);

    $('a.contains("")', html).each(function () {
      const title = $(this).text();
      const url = $(this).attr("href");

      challenges.push({
        title,
        url,
      });
    });

    res.json(challenges);
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
