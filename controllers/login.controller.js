const{response}= require('express');
const bcrypt=require('bcryptjs');
const UsuarioModel = require('../models/usuario.model');
const{generarJWT}= require('../helpers/jwt');
const { googleVerify } = require('../helpers/google-verify');
const { getMenuFrontEnd } = require('../helpers/menu-frontend');

const login = async(req, res=response) => {
    const {email, password}=req.body;
    try {
        
        const usuarioDB= await UsuarioModel.findOne({email});
        //Verificar email
        if(!usuarioDB){
          return res.status(404).json({
                ok:false,
                msg:'Email no valido'
            })
        }

        //Verificar Password
        const validPassword= bcrypt.compareSync(password, usuarioDB.password);
        if(!validPassword){
            return res.status(400).json({
                  ok:false,
                  msg:'Password no valida'
              })
          }

        //Generar JWT
        const token = await generarJWT(usuarioDB.id)

        res.json({
            ok:true,
            token,
            menu: getMenuFrontEnd(usuarioDB.role)
        })
        
    } catch (error) {
        res.status(500).json({
            ok:false,
            msg:'hable con el administrador'
        })
    }
}

const googleSign = async(req, res=response) => {

   
    try {
        const { email, name, picture } = await googleVerify( req.body.token );

        const usuarioDB = await UsuarioModel.findOne({ email });
        let usuario;

        if ( !usuarioDB ) {
            usuario = new UsuarioModel({
                nombre: name,
                email,
                password: '@@@',
                img: picture,
                google: true
            })
        } else {
            usuario = usuarioDB;
            usuario.google = true;
            // usuario.password = '@@';
        }

        // Guardar Usuario
        await usuario.save();

        // Generar el TOKEN - JWT
        const token = await generarJWT( usuario.id );


        res.json({
            ok: true,
            email, name, picture,
            token,
            menu: getMenuFrontEnd(usuarioDB.role)
        });
        
    } catch (error) {
        console.log(error);
        res.status(400).json({
            ok: false,
            msg: 'Token de Google no es correcto'
        });
    }
    
}

const renewToken= async (req, res=response) => {
    const uid= req.uid;

    //GENERAR TOKEN - JWT
    const token = await generarJWT(uid)

    //Extraer informacion del usuario
    const usuario= await UsuarioModel.findById(uid);

    res.json({
        ok:true,
        uid,
        token,
        usuario,
        menu: getMenuFrontEnd(usuario.role)
    })
}

module.exports={
    login,
    googleSign,
    renewToken
}