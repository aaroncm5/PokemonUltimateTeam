const knex = require('knex')(require('../knexfile'));
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const {uuid} = require('uuidv4');

exports.createUser = (req,res) => {
    const {
        user_name,
        user_username,
        user_email,
        user_password
    } = req.body;

    if (!user_name || !user_username || !user_email || !user_password){
        return res.status(400).send("FIGURE IT OUT CLOWN");
    }

    const encryptedPassword = bcrypt.hashSync(user_password);

    const newUser = {
        id: uuid(),
        user_name,
        user_username,
        user_email,
        user_password: encryptedPassword
    }

    knex('users')
    .insert(newUser)
    .then(() => {
        res.status(201).send('successfully created profile')
    })
    .catch((err) => res.status(400).send('Error in Sign Up'));
}

exports.loginUser = (req, res) => {
    const { user_email, user_password} = req.body;

    if (!user_email || !user_password) {
        return res.status(400).send('please enter the required fields');
    }

    knex('users')
    .where({user_email: user_email})
    .first()
    .then((user) => {
        console.log(user);
        if (!user) {
            return res.status(400).send('invalid email');
        }
    
        const verifyPassword = bcrypt.compareSync(user_password, user.user_password)
        if (!verifyPassword) {
            return res.status(400).send('invalid password')
        }
    
        // Generate a token
        const token = jwt.sign(
            { id: user.id, email: user.email },
            process.env.JWT_KEY,
            { expiresIn: "24h" }
        );

        res.json({token});
    })
}

exports.currentUser = (req, res) => {
    knex('users').where({id: req.user.id}).first()
    .then((user) => {
        delete user.user_password
        res.json(user);
    })
}
    
