const router = require('express').Router();
const pokemonController = require('../controllers/pokemonController');
const authorize = require('../middleware/authorize');

router.route('/all')
    .get(pokemonController.getAllPokemon);

router.route('/:id')
    .get(pokemonController.getIndividualPokemon);

router.route('/:id/moves')
    .get(pokemonController.getPokemonMoves)

module.exports = router;