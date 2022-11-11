/*
Raiz de la ruta= /api/hospitales
*/
const {Router} = require('express');
const { check }= require('express-validator')
const {validarCampos}= require('../middleware/validar-campos');
const {getMedico,
        createMedico,
        updateMedico,
        deleteMedico,
        getMedicoID} = require('../controllers/medico.controller');
const { validarJWT } = require('../middleware/validar-jwt');
const router= Router();

router.get('/',validarJWT,getMedico);

router.post('/',[
        validarJWT,
        check('nombre','El nombre del médico es necesario').not().isEmpty(),
        check('hospital','El médico es necesario').isMongoId(),
        validarCampos
     
],createMedico);


router.put('/:id',[
        validarJWT,
        check('nombre','El nombre del médico es necesario').not().isEmpty(),
        validarCampos
         
    ],updateMedico);
    
router.delete('/:id',validarJWT,deleteMedico);

router.get('/:id',validarJWT,getMedicoID);

module.exports= router;