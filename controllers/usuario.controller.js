const bcrypt=require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');
const UsuarioModel = require('../models/usuario.model');

const getUsuarios= async(req, res) =>{

    const desde= Number(req.query.desde) || 0;

/*     const usuarios= await UsuarioModel
                            .find({},'nombre email role google')
                            .skip(desde)//uestra el registro <<desde>> hasta el <<limit>>
                            .limit(5)

    const totalRegistros= await UsuarioModel.count; */

    //Ejecuta todas esas promesas
    const[usuarios, total]=await Promise.all([
        //Primera Promesa para buscar usuarios paginados
        UsuarioModel
        .find({},'nombre email role google img')
        .skip(desde)//uestra el registro <<desde>> hasta el <<limit>>
        .limit(5),
        
        //Segunda Promesa para contar registros
        UsuarioModel.countDocuments()
    ])

    res.status(200).json({
        ok:true,
        usuarios,
        registros:total
    })
};

const createUsuarios= async(req, res) =>{
    const {email, password, nombre}= req.body;
    

    try {
        const existeEmail= await UsuarioModel.findOne({email});

        if(existeEmail){
            return res.status(400).json({
                ok:false,
                msg:'The email fue creado antes..'
            });
        }

        const usuario = new UsuarioModel(req.body)
        
        //Encriptar contrasena
        const salt=bcrypt.genSaltSync();
        usuario.password=bcrypt.hashSync(password, salt)
        
        //Guardo Usuario en la base
        await usuario.save();

         //Generar JWT
         const token = await generarJWT(usuario.id)

        res.json({
            ok:true,
            usuario,
            token
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg: 'Error inesperado.... revisar logs'
        });
        
    }

  
};

const updateUsuarios= async(req, res) =>{
    const uid= req.params.id;
    
    

    try {
        const usuarioDB= await UsuarioModel.findById(uid);
        
        if(!usuarioDB){
            return res.status(400).json({
                ok:false,
                msg:'No existe un usuario con ese id..'
            });
        }

        const {password, google,email, ...campos}= req.body;
        //Valido si actualizo el email que no exista en la DB
        if(usuarioDB.email != email){
           
            const existeEmail= await UsuarioModel.findOne({email});

            if(existeEmail){
                return res.status(400).json({
                    ok:false,
                    msg:'The email ya existe con otro usuario..'
                });
            }
        }

        if(!usuarioDB.google){
            campos.email=email;
        }else if(usuarioDB.email !== email){
            return res.status(400).json({
                ok:false,
                msg:'Usuario de Google no puede cambiar su correo'
            })
        }

        const usuarioActualizado= await UsuarioModel.findByIdAndUpdate(uid, campos, {new:true});

       
        res.json({
            ok:true,
            usuario:usuarioActualizado
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg: 'Error inesperado.... revisar logs'
        });
        
    }

  
};

const borrarUsuario= async(req,res)=>{
    try {
        const uid= req.params.id;
        const usuarioDB= await UsuarioModel.findById(uid);

        if(!usuarioDB){
            return res.status(400).json({
                ok:false,
                msg:'No existe un usuario con ese id..'
            });
        }

        await UsuarioModel.findByIdAndDelete(uid);
        res.json({
            ok:true,
            msg :`Usuario con id ${uid} , eliminado`
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg: 'Error inesperado Eliminar.... revisar logs'
        });
        
    }
}

module.exports={
    getUsuarios,
    createUsuarios,
    updateUsuarios,
    borrarUsuario
}