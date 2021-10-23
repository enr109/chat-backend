const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { getUsuarioPorid, crearUsuario, actualizarUsuario, getUsuarios } = require('../controllers/usuarios');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();


router.get('/',
    /* validarJWT, */
    getUsuarios
);

router.post('/',
[
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('telefono','El telefono es obligatorio').not().isEmpty(),
    check('password','El password es obligatorio').not().isEmpty(),
    check('email', 'El email es obligatorio').not().notEmpty().isEmail(),
    check('prioridad', 'La prioridad es obligatoria').not().notEmpty(),
    check('problema','El problema es obligatorio').not().notEmpty(),
    check('promocion','La promocion es obligatorio').not().notEmpty(),
    check('curp','La curp es obligatorio').not().notEmpty(),
    validarCampos
]
,crearUsuario);

router.get('/:id',
    validarJWT,
    getUsuarioPorid
);

router.put('/:id',
[
    validarJWT,
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('telefono','El telefono es obligatorio').not().isEmpty(),
    check('password','El password es obligatorio').not().isEmpty(),
    check('email', 'El email es obligatorio').not().notEmpty().isEmail(),
    check('prioridad', 'La prioridad es obligatoria').not().notEmpty(),
    check('problema','El problema es obligatorio').not().notEmpty(),
    check('promocion','La promocion es obligatorio').not().notEmpty(),
    check('curp','La curp es obligatorio').not().notEmpty(),
    validarCampos
], actualizarUsuario);


module.exports = router;