const express = require('express');
const { dbConnection } = require('./database/config');
require('dotenv').config();
const cors = require('cors');

//Crear el servidor de express
const app = express();

//Base de datos
dbConnection();

const headers = {
    cors: {
        origin: 'http://127.0.0.1:5173',
        methods: ['GET,POST']
    }
}
//CORS
app.use(cors(headers));

app.use(express.static('public'));

//Lectura y parseo del body
app.use(express.json());

//Rutas 
app.use('/api/auth', require('./routes/auth'));
app.use('/api/task', require('./routes/task'));

//Escuchar peticiones en puerto 4000
app.listen(process.env.PORT, () => {
    console.log('Servidor corriendo en puerto', process.env.PORT);

})


