const express = require('express');
const bodyParser = require('body-parser');
const { dbConnection } = require('./database/config');
require('dotenv').config();

const app = express();

//Base de datos
dbConnection();

app.use(express.static('public'));

app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.json({  ok: true,
                msg: 'Hola Mundo' });
});

app.use('/api/auth', require('./routes/auth'));

app.listen(process.env.PORT, () => {
    console.log('Servidor corriendo en puerto', process.env.PORT);
})

