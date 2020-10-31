const { Router } = require('express');
const Outfit = require('../models/outfits');

module.exports = Router()
  .post('/', (req, res, next) => {

    Outfit
      .insert(req.body)
      .then(outfit => res.send(outfit))
      .catch(next);
  })

  .get('/', (req, res, next) => {
    Outfit
      .find()
      .then(outfits => res.send(outfits))
      .catch(next);
  });
