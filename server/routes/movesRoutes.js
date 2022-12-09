const router = require('express').Router();
const pokemonController = require('../controllers/pokemonController');
const authorize = require('../middleware/authorize');

router.route('/')
    .get(pokemonController.getAllMoves);

module.exports = router;