const express = require('express');
const app = express();
app.use(express.json());
const axios = require('axios');



require('dotenv').config();
const PORT = process.env.PORT;
const cors = require('cors');
app.use(cors());

const userRoute = require('./routes/userRoutes');
const pokemonRoute = require('./routes/pokemonRoutes');

app.use('/users', userRoute);
app.use('/pokemon', pokemonRoute);

app.get('/poke', (req, res) => {
    axios.get('https://pokeapi.co/api/v2/pokemon?limit=150')
    .then(({data}) => {
    res.json(data);
    })
    .catch(err => console.log(err))
});

app.listen(PORT, () => {
    console.log(`we're live ${PORT}`);
});