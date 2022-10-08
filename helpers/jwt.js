const jwt= require('jsonwebtoken');
require('dotenv').config();
const variablesEntorno=process.env;

const generarJWT = (uid) => {

    return new Promise ((resolve, reject) => {
        const payload ={
            uid
        }
    
        jwt.sign(payload,variablesEntorno.JWT_SECRET,{
            expiresIn:'12h'
        },(err, token) => {
            if(err){
                console.log(err)
                reject('Error al generar JWT')
            }else{
                resolve(token)
            }
        })
    });

    
}

module.exports={
    generarJWT
}