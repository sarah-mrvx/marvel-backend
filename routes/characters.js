const express = require("express");
const axios = require("axios");
const router = express.Router();
require("dotenv").config();

router.get("/characters", async (req, res) => {
  try {
    const response = await axios
      .get(
        `https://lereacteur-marvel-api.herokuapp.com/characters?apiKey=${process.env.MARVEL_API_KEY}`
      )
      .then(async (response) => {
        const { count, limit, results } = response.data;
        const { name, page } = req.query;
        let characters = {};

        //Pagination
        let skip = "";
        if (page) {
          skip = (page - 1) * limit;
        } else {
          skip = 0;
        }

        //Search
        if (name) {
          characters = await results.find(
            (character) => character.name == name
          );
          // .limit(limit)
          // .skip(skip);
        } else characters = response.data;
        // .limit(limit).skip(skip);

        //   if (name) {
        //       filters.character.name = new RegExp(req.query.name, "i");
        //   }
        return res.status(200).json(characters);
      })
      .catch((error) => {
        console.log(error);
      });
  } catch (error) {
    console.log(error.message);
  }
});

module.exports = router;
