/*
Raiz de la ruta= /api/hospitales
*/
const {Router} = require('express');
const { check }= require('express-validator')
const {validarCampos}= require('../middleware/validar-campos');
const {getMedico,
        createMedico,
        updateMedico,
        deleteMedico} = require('../controllers/medico.controller');
const { validarJWT } = require('../middleware/validar-jwt');
const router= Router();

router.get('/',getMedico);

router.post('/',[
        validarJWT,
        check('nombre','El nombre del hospital es necesario').not().isEmpty(),
        check('hospital','El hospital es necesario').isMongoId(),
        validarCampos
     
],createMedico);

router.put('/:id',[
   
     
],updateMedico);

router.delete('/:id',deleteMedico);

module.exports= router;