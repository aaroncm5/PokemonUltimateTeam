const router = require('express').Router();
const teamController = require('../controllers/teamController');
const authorize = require('../middleware/authorize');


router.route('/all')
    .get(teamController.getAllTeams);

router.route('/user/:userId')
    .get(teamController.getUserTeam);

router.route('/:teamId')
    .get(teamController.getTeamName);


module.exports = router;