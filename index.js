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


//Middleware temporal para probar el html del boton de google sign in
app.use(express.static('public'));

//Base de datos
dbConnection();

//Usuario y Password MongoAtlas
//carpullre
//C@pr1716731573


//Rutas
app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/login', require('./routes/auth'));
app.use('/api/hospitales', require('./routes/hospitales'));
app.use('/api/medicos', require('./routes/medicos'));
app.use('/api/busqueda', require('./routes/busqueda'));
app.use('/api/upload', require('./routes/upload'));



app.listen(variablesEntorno.PORT, () =>{
    console.log('Servidor corriendo en el puerto '+variablesEntorno.PORT);
})