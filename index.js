// // Server Model: Contiene todo el servidor de express + socket.io configurado
// const Server = require('./models/server');

// // Paquete para leer y establecer las variables de entorno
// require('dotenv').config();

// // Inicializar la instancia del server
// const server = new Server();

// // Ejecutar el server
// server.execute();

const express = require('express');
const path = require('path');
require('dotenv').config();
const socketio = require('socket.io');

const cors = require('cors');

const Sockets = require('./models/sockets');
const { dbConnection } = require('./db/config');

// Crear el servidor de express
const app = express();

// configurar Cors 
app.use(cors());

// Lectura y parseo del body
app.use(express.json());

// Base de datos
dbConnection();

// Configuraciones de sockets

// Directorios publicos
app.use(express.static('public'));

// Rutas
app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/mensajes', require('./routes/mensajes'));
app.use('/api/login', require('./routes/auth'));
/* app.use('/api/upload',require('./routes/uploads')); */

const server = app.listen( process.env.PORT, () => {
    console.log('Sevidor corriendo ' + process.env.PORT);
});

const io = socketio(server);

/* io.on('connection', () => {
    console.log('conectado');
}); */

new Sockets( io );