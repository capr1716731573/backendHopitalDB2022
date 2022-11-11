/*
Raiz de la ruta= /api/usuarios
*/
const {Router} = require('express');
const { check }= require('express-validator')
const {validarCampos}= require('../middleware/validar-campos');
const {getUsuarios, createUsuarios, updateUsuarios, borrarUsuario} = require('../controllers/usuario.controller');
const { validarJWT, validarAdminRole, validarAdminRol_MismoUsuario } = require('../middleware/validar-jwt');
const router= Router();

router.get('/',validarJWT,getUsuarios);

router.post('/',[
    //Aqui van los middleares
    check('nombre','El nombres es obligatorio').not().isEmpty(),
    check('password','El password es obligatorio').not().isEmpty(),
    check('email','El email es obligatorio').isEmail(),
    check('email','No tiene formato de email').not().isEmpty(),
    validarCampos
     
],createUsuarios);

router.put('/:id',
    [
     validarJWT,
     validarAdminRol_MismoUsuario,   
    //Aqui van los middleares
    check('nombre','El nombres es obligatorio').not().isEmpty(),
    check('email','El email es obligatorio').isEmail(),
    check('role','No tiene formato de email').not().isEmpty(),
    validarCampos
     
],updateUsuarios);

router.delete('/:id',borrarUsuario);

module.exports= router;