const router = require('express').Router();
const seedController = require('../controllers/seedController');
const authorize = require('../middleware/authorize');

router.route('/')
    .get(seedController.updatePokemonList);

router.route('/pokemonwithmoves')
    .get(seedController.getAllMoves)

module.exports = router;