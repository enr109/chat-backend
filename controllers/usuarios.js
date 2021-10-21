const { response } = require('express');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/jwt');


const getUsuarios = async(req, res = response) => {
    const usuarios = await Usuario.find();

    res.json({
        ok: true,
        usuarios
    })
}

const crearUsuario = async(req, res = response) => {
    const { nombre,telefono, imagen, edad, email, password, prioridad, problema, promocion, curp } = req.body;
    

    try {
        const existeEmail = await Usuario.findOne({ email });

        if ( existeEmail ) {
            return res.status(400).json({
                ok: false,
                msg: 'El correo ya esta registrado'
            }); 
        }

        const usuario = new Usuario(req.body);

        // Encriptar contraseña
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync( password, salt);

        // Guardar usuario
        await usuario.save();

        // Generar un token
        const token = await generarJWT( usuario.id);

        res.json({
            ok: true,
            usuario,
            token
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado... revisar logs'
        })
    }
}
const getUsuarioPorid = async(req, res = response) => {
    const id = req.params.id;

    try {
        const usuario = await Usuario.findById(id);

        res.json({
            ok: true,
            usuario
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
        
    }
}

const actualizarUsuario = async(req,res = response ) => {
    const id = req.params.id;
    const uid = req.uid;

    try {
        const usuarioDB = await Usuario.findById( id );

        if ( !usuarioDB ) {
            return res.status(404).json({
                ok: false,
                msg: 'Usuario no encontrado por id'
            });
        }

        // Actualizaciones
        const { password, email, ...campos } = req.body;

        if ( usuarioDB.email !== email ) {
            const existeEmail = await Usuario.findOne({ email});

            if ( existeEmail ) {
                return res.status(400).json({
                    ok: false,
                    msg: 'Ya existe un usuario con este email'
                });
                
            }
        }

        const usuarioActualizado = await Usuario.findByIdAndUpdate( uid, campos, { new: true })

        res.json({
            ok: true,
            usuario: usuarioActualizado
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        })
    }
}


module.exports = {
    getUsuarioPorid,
    crearUsuario,
    actualizarUsuario,
    getUsuarios
}