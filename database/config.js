const mongoose = require('mongoose');
require('dotenv').config();
const variablesEntorno=process.env;

const dbConnection= async () => {

    try{
        await mongoose.connect(variablesEntorno.DB_CONNECT);
        console.log('DB Online');
    }catch(error){
        console.log(error);
        throw new Error('Error al iniciar Base de Datos HospitalDB');
    }


 
}

module.exports={
    dbConnection:dbConnection
}