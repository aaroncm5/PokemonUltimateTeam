const router = require('express').Router();
const pokemonController = require('../controllers/pokemonController');
const authorize = require('../middleware/authorize');


router.route('/team')
    .post(authorize, pokemonController.postTeam);

router.route('/all')
    .get(pokemonController.getAllPokemon);

router.route('/:id')
    .get(pokemonController.getIndividualPokemon);

router.route('/:id/default')
    .get(pokemonController.getDefaultPokemon);

router.route('/move/:name')
    .get(pokemonController.moveDetails);

    
module.exports = router;