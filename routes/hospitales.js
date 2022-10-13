/*
Raiz de la ruta= /api/hospitales
*/
const {Router} = require('express');
const { check }= require('express-validator')
const {validarCampos}= require('../middleware/validar-campos');
const {getHospitales,
        createHospital,
        updateHospital,
        deleteHospital} = require('../controllers/hospital.controller');
const { validarJWT } = require('../middleware/validar-jwt');
const router= Router();

router.get('/',getHospitales);

router.post('/',[
    validarJWT,
    check('nombre','El nombre del hospital es necesario').not().isEmpty(),
    validarCampos
     
],createHospital);

router.put('/:id',[
   
     
],updateHospital);

router.delete('/:id',deleteHospital);

module.exports= router;