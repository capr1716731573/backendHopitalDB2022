/*
Raiz de la ruta= /api/login
*/
const {Router} = require('express');
const { check }= require('express-validator')
const {validarCampos}= require('../middleware/validar-campos');
const {login}= require('../controllers/login.controller');
const router= Router();



router.post('/',[
    //Aqui van los middleares
    check('password','El password es obligatorio').not().isEmpty(),
    check('email','El email es obligatorio').isEmail(),
    check('email','No tiene formato de email').not().isEmpty(),
    validarCampos     
],login);



module.exports= router;