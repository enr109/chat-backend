const { response } = require('express');
const Mensaje = require('../models/mensajes');


const getMensajes = async( req, res = response ) => {
    const miId = req.uid;
    const mensajesDe = req.params.de;
    const last = await Mensaje.find({
        $or: [
            { de: miId, para: mensajesDe },
            { de: mensajesDe, para: miId }
        ]
    })
    .sort({ createdAt: 'desc'})
    .limit(30);
    
    res.json({
        ok: true,
        mensajes: last
    })
}

const crearmensaje = async(req, res = response) => {
    const uid = req.uid;
    const mensaje = new Mensaje({
        usuario:uid,
        ...req.body
    });

    try {

        const mensajeDB = await mensaje.save();

        res.json({
            ok: true,
            mensaje: mensajeDB
        })
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
        
    }
}

const borrarMensaje = async(req, res = response) => {
    const id = req.params.id;

    try {
        const mensaje = await Mensaje.findById( id);
        if ( !mensaje ) {
            return res.status(404).json({
                ok: false,
                msg: 'Mensaje no encontrado por id'
            });
        }

        await Mensaje.findByIdAndDelete( id );

        res.json({
            ok: true,
            msg: 'Mensaje eliminado'
        })
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
        
    }
}

module.exports = {
    getMensajes,
    crearmensaje,
    borrarMensaje
}