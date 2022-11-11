const {request,response}= require('express');
const jwt= require('jsonwebtoken');
const usuarioModel = require('../models/usuario.model');
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

const validarAdminRole= async(req=request,res=response,next) =>{
    const uid= req.uid;
    try {
        const usuarioDB= await usuarioModel.findById(uid);
        if(!usuarioDB){
            return res.status(404).json({
                ok:false,
                msg:'Usuario no existe'
            });
        }

        if(usuarioDB.role !== 'ADMIN_ROLE'){
            return res.status(403).json({
                ok:false,
                msg:'No tiene privilegios para hacer eso'
            });
        }
        next();


    } catch (error) {
        res.status(500).json({
            ok:false,
            msg:'Hable con el Administrador'
        })
    }
}

const validarAdminRol_MismoUsuario= async(req=request,res=response,next) =>{
    const uid= req.uid;
    const id= req.params.id;
    try {
        const usuarioDB= await usuarioModel.findById(uid);
        if(!usuarioDB){
            return res.status(404).json({
                ok:false,
                msg:'Usuario no existe'
            });
        }

        if(usuarioDB.role === 'ADMIN_ROLE' || uid === id){
            next();
        } else{
            return res.status(403).json({
                ok:false,
                msg:'No tiene privilegios para hacer eso'
            });
        }


    } catch (error) {
        res.status(500).json({
            ok:false,
            msg:'Hable con el Administrador'
        })
    }
}

module.exports={
    validarJWT,
    validarAdminRole,
    validarAdminRol_MismoUsuario
}