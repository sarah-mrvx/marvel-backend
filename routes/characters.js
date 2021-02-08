const express = require("express");
const axios = require("axios");
const router = express.Router();
require("dotenv").config();

router.get("/characters", async (req, res) => {
  try {
    const { name, skip } = req.query;
    const response = await axios
      .get(
        `https://lereacteur-marvel-api.herokuapp.com/characters?apiKey=${process.env.MARVEL_API_KEY}&skip=${skip}`
      )
      .then(async (response) => {
        const { count, limit, results } = response.data;

        let characters = {};
        //Search
        if (name) {
          searchCharacter = [
            await results.find((character) => character.name == name),
          ];
          if (searchCharacter[0]) {
            characters = searchCharacter;
          } else {
            characters = results;
          }
        } else characters = results;

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
