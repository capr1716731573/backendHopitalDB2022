const {request,response}= require('express');
const jwt= require('jsonwebtoken');
require('dotenv').config();
const variablesEntorno=process.env;

const validarJWT= (req=request,res=response,next) =>{
    //Leer Token
    const token= req.header('x-token');
    if(!token){
        return res.status(401).json({
            ok:false,
            msg:'No existe token'
        });
    }

    try {
        //Cada ves que ejecuto el middleware JWT extraigo el valor o valores con los cuales forme el JWT
        //en este ejemplo el "uid"
        const {uid}= jwt.verify(token, variablesEntorno.JWT_SECRET);
        req.uid=uid;
        next();

    } catch (error) {
        return res.status(401).json({
            ok:false,
            msg:'Token no valido'
        });
    }

    
}

module.exports={
    validarJWT
}