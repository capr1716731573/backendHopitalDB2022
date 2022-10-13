const {response, request} = require('express');
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

const updateMedico= (req=request, res=response) => {
    res.json({
        ok:true,
        msg:'updateMedico'
    })
}

const deleteMedico= (req=request, res=response) => {
    res.json({
        ok:true,
        msg:'deleteMedico'
    })
}

module.exports={
    getMedico,
    createMedico,
    updateMedico,
    deleteMedico
}