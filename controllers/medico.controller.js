const {response, request} = require('express');
const medicosModel = require('../models/medicos.model');
const Medico= require("../models/medicos.model");

const getMedico= async(req=request, res=response) => {
    const medicos= await Medico.find()
                            .populate('usuario','nombre img')
                            .populate('hospital','nombre img')

    res.json({
        ok:true,
        medicos
    })
}

const getMedicoID= async(req=request, res=response) => {
    const id= req.params.id;
    try {
        const medico= await Medico.findById(id)
        .populate('usuario','nombre img')
        .populate('hospital','nombre img')

        res.json({
        ok:true,
        medico
        })
    } catch (error) {
        res.status(500).json({
            ok:false,
            msg:'Error - Hable con Administrador'
        })    
    }

   
}

const createMedico= async (req=request, res=response) => {
      
    const uid= req.uid;
    const medico= new Medico({
        usuario:uid,
        ...req.body
    });

    try {
        const medicolDB=await medico.save();
        
        res.json({
            ok:true,
            medico:medicolDB
        })
        
    } catch (error) {
        res.status(500).json({
            ok:false,
            msg:'Error crear Medico, hable con el Administrador'
        })
    }
}


const updateMedico= async (req=request, res=response) => {
    const id= req.params.id;
    const uid= req.uid;
    try {
        const medico= await Medico.findById(id);

        if(!medico){
            res.status(400).json({
                ok:false,
                msg:'Medico no existe'
            })
        }

        const cambiosMedico={
            ...req.body,
            usuario:uid
        }

        const medicoActualizado= await Medico.findByIdAndUpdate(id, cambiosMedico,{new:true})

        res.json({
            ok:true,
            msg:'Medico Actualizado',
            medicoActualizado
        })

    } catch (error) {
        res.status(500).json({
            ok:false,
            msg:'Error al actualizar, hable con el administrador'
        })
    }

   
}

const deleteMedico= async (req=request, res=response) => {
    const id= req.params.id;
    console.log(id)
    try {
        const medico= await Medico.findById(id);

        if(!medico){
            res.status(400).json({
                ok:false,
                msg:'Médico no existe'
            })
        }

        const medico_actualizado= await medicosModel.findByIdAndDelete(id)

        res.json({
            ok:true,
            msg:'Médico Eliminado',
        })

    } catch (error) {
        res.status(500).json({
            ok:false,
            msg:'Error al eliminar, hable con el administrador'
        })
    }

}


module.exports={
    getMedico,
    createMedico,
    updateMedico,
    deleteMedico,
    getMedicoID
}