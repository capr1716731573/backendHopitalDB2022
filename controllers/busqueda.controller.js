const {response, request} = require('express');
const UsuarioModel= require('../models/usuario.model')
const HospitalModel= require('../models//hospitales.model')
const MedicoModel= require('../models/medicos.model')

const getTodo= async(req=request, res=response) => {
    const busqueda=req.params.busqueda;
    
    //Expresion regular para busqueda insensible
    const regex= new RegExp(busqueda, 'i');

    const [usuarios, hospitales, medicos] = await Promise.all([
        UsuarioModel.find({nombre:regex}),
        HospitalModel.find({nombre:regex}),
        MedicoModel.find({nombre:regex})
    ])

    res.json({
        ok:true,
        usuarios,
        hospitales,
        medicos
    })
}

const getTodoTabla= async(req=request, res=response) => {
    const busqueda=req.params.busqueda;
    const tabla=req.params.tabla;

    //Expresion regular para busqueda insensible
    const regex= new RegExp(busqueda, 'i');
    let data=[];

    switch (tabla) {
        case 'medicos':
            data= await MedicoModel.find({nombre:regex})
                                    .populate('usuario','nombre img')
                                    .populate('hospital','nombre img');
            break;

        case 'hospitales':
            data= await HospitalModel.find({nombre:regex})
                                     .populate('usuario','nombre img');
            break;

        case 'usuarios':
            data= await UsuarioModel.find({nombre:regex});
            break;
    
        default:
            return response.status(400).json({
                ok:false,
                msg:"La tabla tiene que ser medicos/hospitales/usuarios"
            })
           
    }


    res.json({
        ok:true,
        data,
    })
}

module.exports={
    getTodo,
    getTodoTabla
}