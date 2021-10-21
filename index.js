const express = require('express');
const path = require('path');
require('dotenv').config();


const cors = require('cors');

const { dbConnection } = require('./db/config');


// Crear el servidor de express
const app = express();

// configurar Cors 
app.use(cors());

// Lectura y parseo del body
app.use(express.json());

// Base de datos
dbConnection();

// Directorios publicos
app.use(express.static('public'));

// Rutas
app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/mensajes', require('./routes/mensajes'));
app.use('/api/login', require('./routes/auth'));
/* app.use('/api/upload',require('./routes/uploads')); */

app.listen( process.env.PORT, () => {
    console.log('Sevidor corriendo ' + process.env.PORT);
})