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
  })

  .get('/:id', (req, res, next) => {
    Outfit
      .findById(req.params.id)
      .then(outfit => res.send(outfit))
      .catch(next);
  })

  .put('/:id', (req, res, next) => {
    Outfit
      .update(req.params.id, req.body)
      .then(outfit => res.send(outfit))
      .catch(next);
  })

  .delete('/:id', (req, res, next) => {
    Outfit
      .delete(req.params.id)
      .then(outfit => res.send(outfit))
      .catch(next);
  });
