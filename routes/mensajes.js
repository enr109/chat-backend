const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { getMensajes,crearmensaje, borrarMensaje } = require('../controllers/mensajes');
const { validarJWT } = require('../middlewares/validar-jwt');


const router = Router();

router.get('/:de',
    validarJWT,
    getMensajes
);

router.post('/',
[
    validarJWT,
    check('mensaje', 'El mensaje es necesario').not().notEmpty(),
    validarCampos
],crearmensaje);

router.delete('/:id',
    validarJWT,
    borrarMensaje
);


module.exports = router;