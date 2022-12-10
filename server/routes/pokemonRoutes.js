const router = require('express').Router();
const pokemonController = require('../controllers/pokemonController');
const authorize = require('../middleware/authorize');

router.route('/all')
    .get(pokemonController.getAllPokemon);

router.route('/:id')
    .get(pokemonController.getIndividualPokemon);

router.route('/:id/default')
    .get(pokemonController.getDefaultPokemon);

router.route('/move/:name')
    .get(pokemonController.moveDetails);

router.route('/team')
    .post(pokemonController.postTeam);





module.exports = router;