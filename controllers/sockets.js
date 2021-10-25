const Usuario = require('../models/usuario');
const Mensaje = require('../models/mensajes');

const usuarioConectado = async( uid ) => {
    const usuario = await Usuario.findById(uid);
    usuario.online = true;
    await usuario.save();

    return usuario;
}

const usuarioDesconectado = async( uid ) => {
    const usuario = await Usuario.findById(uid);
    usuario.online = false;
    await usuario.save();

    return usuario;
}


const getUsuarios = async() => {
    const usuarios = await Usuario.find()
    .sort('-online');

    return usuarios;
}

const grabarMensaje = async( payload) => {

    try {
        const mensaje = new Mensaje(payload);
        const { de ,para } = await mensaje.save();
        const imagenpara = await Usuario.findById(para);
        const imagende = await Usuario.findById(de);
        mensaje.para = imagenpara;
        mensaje.de = imagende;
        return mensaje;
        
    } catch (error) {
        console.log(error);
        return false;
    }

}


module.exports = {
    usuarioConectado,
    usuarioDesconectado,
    getUsuarios,
    grabarMensaje
}