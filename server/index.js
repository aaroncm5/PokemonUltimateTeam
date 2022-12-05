const express = require('express');
const app = express();
app.use(express.json());


require('dotenv').config();
const PORT = process.env.PORT;
const cors = require('cors');
app.use(cors());

app.listen(PORT, () => {
    console.log(`we're live ${PORT}`);
});