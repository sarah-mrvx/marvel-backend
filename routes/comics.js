const express = require("express");
const axios = require("axios");
const router = express.Router();

router.get("/comics", async (req, res) => {
  try {
    const { title } = req.query;
    const response = await axios
      .get(
        `https://lereacteur-marvel-api.herokuapp.com/comics?apiKey=${process.env.MARVEL_API_KEY}`
      )
      .then(async (response) => {
        const { results } = response.data;

        let comics = [];
        if (title) {
          const regex = new RegExp(title, "i");
          comics = results.filter((comics) => {
            return regex.test(comics.title);
          });
        } else {
          comics = results;
        }

        return res.status(200).json(comics);
      })
      .catch((error) => {
        console.log(error);
      });
  } catch (error) {
    console.error(error.message);
  }
});

module.exports = router;
