const { response } = require("express");
const fs=require('fs');
const path= require('path');
const { v4: uuidv4 } = require('uuid');
const {actualizarImagen}= require("../helpers/actualizar.imagen");


const fileUpload = (req, res=response) => {

    const tipo = req.params.tipo;
    const id = req.params.id;

    const tiposValidos =['hospitales','usuarios','medicos'];
    
    //Valido que sean los tipos
    if(!tiposValidos.includes(tipo)){
        return res.status(400).json({
            ok:false,
            msg:'El tipo seleccionado debe ser [Medico, Usuario u Hospital]'
        })
    }

    //Valido que se haya subido algun archivo
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            ok:false,
            msg:'Ningun archivo fue subido'
        })
    }

    //Procesar la Imagen
    const file= req.files.imagen;
    const nombreCortado= file.name.split('.');
    const extensionArchivo= nombreCortado[nombreCortado.length-1];

    //Validar extension
    const extensionesValidas= ['pdf','png','jpg','jpeg','gif'];
    if(!extensionesValidas.includes(extensionArchivo)){
        return res.status(400).json({
            ok:false,
            msg:'La extensión del archivo no es válida'
        })
    }

    //Generar el nombre del archivo
    const nombreArchivo=`${uuidv4()}.${extensionArchivo}`;

    //Path para guardar imagen
    const path=`./uploads/${tipo}/${nombreArchivo}`;

    //Mover el archivo a la carpeta
    file.mv(path , (error)=>{
        if(error){
            return res.status(500).json({
                ok:false,
                msg:'Error al mover el archivo'
            })
        }

    //Actualizar imagen en Base de Datos
    const respuesta=actualizarImagen(tipo, id, path, nombreArchivo);
    if(!respuesta){
        return res.status(500).json({
            ok:false,
            msg:`Id de ${tipo} no existe`
        })
    }
    

    res.json({
        ok:true,
        msg:'Archivo subido con exito',
        archivo:nombreArchivo
        })
    });

   
}


const retornaImagen= (req, res=response)=>{
    const tipo= req.params.tipo;
    const foto= req.params.foto;

    const pathImg= path.join(__dirname,`../uploads/${ tipo }/${ foto }`);
    
    //Verificar si imagen existe sino se va una por defecto
    if(fs.existsSync(pathImg)){
        res.sendFile(pathImg);
    }else{
        const  pathImg= path.join(__dirname,`../uploads/no-img.png`);
        res.sendFile(pathImg);
    }
    
}

module.exports= {
    fileUpload,
    retornaImagen
};