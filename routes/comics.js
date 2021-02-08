const express = require("express");
const axios = require("axios");
const router = express.Router();

router.get("/comics", async (req, res) => {
  try {
    const response = await axios
      .get(
        `https://lereacteur-marvel-api.herokuapp.com/comics?apiKey=${process.env.MARVEL_API_KEY}`
      )
      .then(async (response) => {
        const { count, limit, results } = response.data;
        const { title, page } = req.query;

        let comics = {};

        //Pagination
        let skip = "";
        if (page) {
          skip = (page - 1) * limit;
        } else {
          skip = 0;
        }

        //Search
        if (title) {
          comics = await results.find((comic) => comic.title == title);
        } else comics = response.data;

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
