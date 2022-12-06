const router = require('express').Router();
const userController = require('../controllers/userController');
const authorize = require('../middleware/authorize')


router.route('/signup')
    .post(userController.createUser);

router.route('/login')
    .post(userController.loginUser)
    // .get(authorize, userController.currentUser);

router.route('/current')
    .get(authorize, userController.currentUser);

module.exports = router;