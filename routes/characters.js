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
      .then((response) => {
        const { results } = response.data;

        let characters = [];
        if (name) {
          const regex = new RegExp(name, "i");
          characters = results.filter((character) => {
            return regex.test(character.name);
          });
        } else {
          characters = results;
        }

        return res.status(200).json(characters);
      })
      .catch((error) => {
        console.log(error);
      });
  } catch (error) {
    console.log(error.message);
  }
});

router.get("/character", async (req, res) => {
  try {
    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/comics/${req.query.id}?apiKey=${process.env.MARVEL_API_KEY}`
    );

    const results = response.data;

    return res.status(200).json(results);
  } catch (error) {
    console.log(error.message);
  }
});

module.exports = router;
