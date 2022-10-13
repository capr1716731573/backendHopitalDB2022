const {response, request} = require('express');
const Hospital= require('../models/hospitales.model')
const getHospitales= async (req=request, res=response) => {

    const hospitales= await Hospital.find()
                                    .populate('usuario','nombre email img')

    res.json({
        ok:true,
        hospitales
    })
}

const createHospital= async(req=request, res=response) => {
    
    const uid= req.uid;
    const hospital= new Hospital({
        usuario:uid,
        ...req.body
    });

    try {
        const hospitalDB=await hospital.save();
        
        res.json({
            ok:true,
            hospital:hospitalDB
        })
        
    } catch (error) {
        res.status(500).json({
            ok:false,
            msg:'Error crear Hospital, hable con el Administrador'
        })
    }

}

const updateHospital= (req=request, res=response) => {
    res.json({
        ok:true,
        msg:'updateHospital'
    })
}

const deleteHospital= (req=request, res=response) => {
    res.json({
        ok:true,
        msg:'deleteHospital'
    })
}

module.exports={
    getHospitales,
    createHospital,
    updateHospital,
    deleteHospital
}