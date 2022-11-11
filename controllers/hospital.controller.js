const {response, request} = require('express');
const HospitalModel= require('../models/hospitales.model')

const getHospitales= async (req=request, res=response) => {

    const hospitales= await HospitalModel.find()
                                    .populate('usuario','nombre email img')

    res.json({
        ok:true,
        hospitales
    })
}

const createHospital= async(req=request, res=response) => {
    
    const uid= req.uid;
    console.log('id usuario: '+uid);
    const hospital= new HospitalModel({
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

const updateHospital= async (req=request, res=response) => {
    const id= req.params.id;
    console.log('id hospital: '+id);
    const uid= req.uid;
    console.log('id usuario: '+uid);
    try {
        const hospital= await HospitalModel.findById(id);

        if(!hospital){
            res.status(400).json({
                ok:false,
                msg:'Hospital no existe'
            })
        }

        const cambiosHospital={
            ...req.body,
            usuario:uid
        }

        const hospitalActualizado= await HospitalModel.findByIdAndUpdate(id, cambiosHospital,{new:true})

        res.json({
            ok:true,
            msg:'Hospital Actualizado',
            hospitalActualizado
        })

    } catch (error) {
        res.status(500).json({
            ok:false,
            msg:'Error al actualizar, hable con el administrador'
        })
    }

   
}

const deleteHospital= async (req=request, res=response) => {
    const id= req.params.id;
    console.log('id hospital: '+id);
    const uid= req.uid;
    console.log('id usuario: '+uid);
    try {
        const hospital= await HospitalModel.findById(id);

        if(!hospital){
            res.status(400).json({
                ok:false,
                msg:'Hospital no existe'
            })
        }

        const hospitalActualizado= await HospitalModel.findByIdAndDelete(id)

        res.json({
            ok:true,
            msg:'Hospital Eliminado',
        })

    } catch (error) {
        res.status(500).json({
            ok:false,
            msg:'Error al eliminar, hable con el administrador'
        })
    }

}

module.exports={
    getHospitales,
    createHospital,
    updateHospital,
    deleteHospital
}