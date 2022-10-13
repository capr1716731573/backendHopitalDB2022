/*
Raiz de la ruta= /api/upload/
*/
const {Router} = require('express');
const expressFileupload = require('express-fileupload');
const { validarJWT } = require('../middleware/validar-jwt');
const { fileUpload, retornaImagen } = require('../controllers/upload.controller');

const router= Router();
router.use(expressFileupload())

router.put('/:tipo/:id',validarJWT,fileUpload);
router.get('/:tipo/:foto',retornaImagen);

module.exports= router;