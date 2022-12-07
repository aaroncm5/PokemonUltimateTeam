const router = require('express').Router();
const pokemonController = require('../controllers/pokemonController');
const authorize = require('../middleware/authorize');

router.route('/all')
    .get(pokemonController.getAllPokemon);



module.exports = router;