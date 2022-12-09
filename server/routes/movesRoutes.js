const router = require('express').Router();
const pokemonController = require('../controllers/pokemonController');
const authorize = require('../middleware/authorize');

// router.route('/')
//     .get(pokemonController.getAllMoves);

// router.route('/pokemonwithmoves')
//     .get(pokemonController.getPokemonWithMoves)

module.exports = router;