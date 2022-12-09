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
const moveRoute = require('./routes/movesRoutes')

app.use('/users', userRoute);
app.use('/pokemon', pokemonRoute);
app.use('/moves', moveRoute)

app.listen(PORT, () => {
    console.log(`we're live ${PORT}`);
});