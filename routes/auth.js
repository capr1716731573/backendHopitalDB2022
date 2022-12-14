/*
Raiz de la ruta= /api/login
*/
const {Router} = require('express');
const { check }= require('express-validator')
const {validarCampos}= require('../middleware/validar-campos');
const {login,googleSign,renewToken}= require('../controllers/login.controller');
const { validarJWT } = require('../middleware/validar-jwt');
const router= Router();



router.post('/',[
    //Aqui van los middleares
    check('password','El password es obligatorio').not().isEmpty(),
    check('email','El email es obligatorio').isEmail(),
    check('email','No tiene formato de email').not().isEmpty(),
    validarCampos     
],login);

router.post('/google',[
    //Aqui van los middleares
    check('token','El token de google es obligatorio').not().isEmpty(),
    validarCampos     
],googleSign);

router.get('/renew',validarJWT,renewToken);



module.exports= router;