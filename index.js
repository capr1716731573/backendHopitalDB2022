const express= require('express');
//Exporto cadena de conexion
const {dbConnection} = require('./database/config');
//leer variables de entorno del paquete npm dotenv
require('dotenv').config();
//entorno para CORS
const cors= require('cors');



const variablesEntorno=process.env;

//crear el servidor de express
const app= express();

//middleware CORS
app.use(cors());

//Lectura y Parseo del Body
app.use(express.json());

//Base de datos
dbConnection();

//Usuario y Password MongoAtlas
//carpullre
//C@pr1716731573


//Rutas
app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/login', require('./routes/auth'));



app.listen(variablesEntorno.PORT, () =>{
    console.log('Servidor corriendo en el puerto '+variablesEntorno.PORT);
})