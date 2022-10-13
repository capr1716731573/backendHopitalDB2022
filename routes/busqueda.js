/*
Raiz de la ruta= /api/busqueda
*/
const {Router} = require('express');
const { check }= require('express-validator')
const {validarCampos}= require('../middleware/validar-campos');
const { validarJWT } = require('../middleware/validar-jwt');
const {getTodo, getTodoTabla}=require('../controllers/busqueda.controller');
const router= Router();

router.get('/:busqueda'
            ,validarJWT
            ,getTodo);
            
router.get('/contenedor/:tabla/:busqueda',validarJWT,getTodoTabla);

module.exports= router;